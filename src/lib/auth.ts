import { headers } from 'next/headers';
import { 
  createSession, 
  validateSessionToken, 
  deleteSession, 
  deleteAllUserSessions,
  getUserBySession,
  getUserSessions,
  setSessionCookie,
  getSessionCookie,
  deleteSessionCookie,
  type Session
} from './session';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db/index';
import bcrypt from 'bcryptjs';

// Authentication helper functions
export async function login(email: string, password: string, ip?: string, browserAgent?: string) {
  try {
    // Find user by email
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (userResult.length === 0) {
      return { success: false, error: 'Invalid credentials' };
    }

    const user = userResult[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Create session
    const session = await createSession(user.id, ip, browserAgent);
    
    // Set session cookie
    await setSessionCookie(session.token);

    return { 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      },
      session: session
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Authentication failed' };
  }
}

export async function logout(allDevices: boolean = false) {
  try {
    const token = await getSessionCookie();
    if (token) {
      const session = await validateSessionToken(token);
      if (session) {
        if (allDevices) {
          // Log out from all devices
          await deleteAllUserSessions(session.userId);
        } else {
          // Log out from current device only
          await deleteSession(session.id);
        }
      }
    }
    await deleteSessionCookie();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: 'Logout failed' };
  }
}

export async function getUserActiveSessions() {
  try {
    const token = await getSessionCookie();
    if (!token) {
      return null;
    }

    const session = await validateSessionToken(token);
    if (!session) {
      return null;
    }

    const userSessions = await getUserSessions(session.userId);
    return userSessions;
  } catch (error) {
    console.error('Get user sessions error:', error);
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const token = await getSessionCookie();
    if (!token) {
      return null;
    }

    const session = await validateSessionToken(token);
    if (!session) {
      return null;
    }

    const user = await getUserBySession(session);
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function getCurrentSession(): Promise<Session | null> {
  try {
    const token = await getSessionCookie();
    if (!token) {
      return null;
    }

    return await validateSessionToken(token);
  } catch (error) {
    console.error('Get current session error:', error);
    return null;
  }
}

export async function register(name: string, email: string, password: string) {
  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return { success: false, error: 'User already exists' };
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await db.insert(users).values({
      name,
      email,
      passwordHash,
    }).returning();

    return { 
      success: true, 
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        name: newUser[0].name,
        createdAt: newUser[0].createdAt
      }
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
}

// Get client IP and browser agent
export async function getClientInfo() {
  const headersList = await headers();
  
  // Get IP address
  const forwarded = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown';
  
  // Get user agent
  const userAgent = headersList.get('user-agent') || 'unknown';
  
  return { ip, userAgent };
} 