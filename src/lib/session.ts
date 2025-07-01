import { db } from '@/db/index';
import { sessions, users } from '@/db/schema';
import { eq, lt } from 'drizzle-orm';
import { cookies } from 'next/headers';

// Session configuration
export const SESSION_EXPIRES_IN_SECONDS = 60 * 60 * 24; // 1 day

// Types
export interface SessionWithToken {
  id: string;
  secretHash: string;
  userId: string;
  ip?: string;
  browserAgent?: string;
  createdAt: Date;
  token: string;
}

export interface Session {
  id: string;
  secretHash: string;
  userId: string;
  ip?: string;
  browserAgent?: string;
  createdAt: Date;
}

// Generate secure random string for session ID and secret
export function generateSecureRandomString(): string {
  // Human readable alphabet (a-z, 0-9 without l, o, 0, 1 to avoid confusion)
  const alphabet = "abcdefghijklmnpqrstuvwxyz23456789";

  // Generate 24 bytes = 192 bits of entropy.
  // We're only going to use 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);

  let id = "";
  for (let i = 0; i < bytes.length; i++) {
    // >> 3 "removes" the right-most 3 bits of the byte
    id += alphabet[bytes[i] >> 3];
  }
  return id;
}

// Hash the session secret using SHA-256
export async function hashSecret(secret: string): Promise<string> {
  const secretBytes = new TextEncoder().encode(secret);
  const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
  return Buffer.from(secretHashBuffer).toString('hex');
}

// Constant-time comparison for security
export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let c = 0;
  for (let i = 0; i < a.length; i++) {
    c |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return c === 0;
}

// Create a new session
export async function createSession(
  userId: string, 
  ip?: string, 
  browserAgent?: string
): Promise<SessionWithToken> {
  const now = new Date();

  const id = generateSecureRandomString();
  const secret = generateSecureRandomString();
  const secretHash = await hashSecret(secret);

  const token = id + "." + secret;

  const session: SessionWithToken = {
    id,
    secretHash,
    userId,
    ip,
    browserAgent,
    createdAt: now,
    token
  };

  // Insert session into database
  await db.insert(sessions).values({
    id: session.id,
    secretHash: session.secretHash,
    userId: session.userId,
    ip: session.ip,
    browserAgent: session.browserAgent,
    createdAt: session.createdAt,
  });

  return session;
}

// Get session by ID
export async function getSession(sessionId: string): Promise<Session | null> {
  const now = new Date();

  const result = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1);

  if (result.length !== 1) {
    return null;
  }

  const row = result[0];
  const session: Session = {
    id: row.id,
    secretHash: row.secretHash,
    userId: row.userId,
    ip: row.ip || undefined,
    browserAgent: row.browserAgent || undefined,
    createdAt: row.createdAt,
  };

  // Check expiration
  if (now.getTime() - session.createdAt.getTime() >= SESSION_EXPIRES_IN_SECONDS * 1000) {
    await deleteSession(sessionId);
    return null;
  }

  return session;
}

// Validate session token
export async function validateSessionToken(token: string): Promise<Session | null> {
  const tokenParts = token.split(".");
  if (tokenParts.length !== 2) {
    return null;
  }
  
  const sessionId = tokenParts[0];
  const sessionSecret = tokenParts[1];

  const session = await getSession(sessionId);
  if (!session) {
    return null;
  }

  const tokenSecretHash = await hashSecret(sessionSecret);
  const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
  if (!validSecret) {
    return null;
  }

  return session;
}

// Delete session
export async function deleteSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

// Delete all sessions for a user
export async function deleteAllUserSessions(userId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}

// Get all active sessions for a user
export async function getUserSessions(userId: string): Promise<Session[]> {
  const now = new Date();
  
  const result = await db
    .select()
    .from(sessions)
    .where(eq(sessions.userId, userId));

  // Filter out expired sessions and convert null to undefined
  const activeSessions = result
    .filter(session => {
      const sessionAge = now.getTime() - session.createdAt.getTime();
      return sessionAge < SESSION_EXPIRES_IN_SECONDS * 1000;
    })
    .map(session => ({
      ...session,
      ip: session.ip || undefined,
      browserAgent: session.browserAgent || undefined,
    }));

  return activeSessions;
}

// Delete expired sessions for a user
export async function cleanupExpiredSessions(userId: string): Promise<void> {
  const now = new Date();
  const expirationTime = new Date(now.getTime() - SESSION_EXPIRES_IN_SECONDS * 1000);
  
  await db
    .delete(sessions)
    .where(
      eq(sessions.userId, userId) && 
      lt(sessions.createdAt, expirationTime)
    );
}

// Get user by session with relations
export async function getUserBySession(session: Session) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  return result[0] || null;
}

// Get user with all their sessions
export async function getUserWithSessions(userId: string) {
  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      sessions: true,
    },
  });

  return result;
}

// Get session with user data
export async function getSessionWithUser(sessionId: string) {
  const result = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
    with: {
      user: true,
    },
  });

  return result;
}

// Cookie management
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('session_token', token, {
    maxAge: SESSION_EXPIRES_IN_SECONDS,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
}

export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('session_token')?.value;
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('session_token');
}

// Public session encoding (omits secret hash)
export function encodeSessionPublicJSON(session: Session): string {
  return JSON.stringify({
    id: session.id,
    userId: session.userId,
    ip: session.ip,
    browserAgent: session.browserAgent,
    createdAt: Math.floor(session.createdAt.getTime() / 1000)
  });
} 