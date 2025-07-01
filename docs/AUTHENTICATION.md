# Authentication System

This project implements a secure authentication system based on [Lucia Auth](https://lucia-auth.com/sessions/basic) patterns using Drizzle ORM and Next.js.

## Features

- **Secure Session Management**: Uses Lucia Auth's session pattern with separate ID and secret
- **Password Hashing**: Bcrypt with 12 salt rounds
- **IP and Browser Tracking**: Stores client IP and user agent for security
- **Automatic Expiration**: Sessions expire after 24 hours
- **Route Protection**: Middleware automatically protects routes
- **CSRF Protection**: Uses HttpOnly cookies with SameSite=Lax

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

### Sessions Table
```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  secret_hash TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  ip TEXT,
  browser_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

### Relations
- **One-to-Many**: A user can have multiple sessions
- **Many-to-One**: A session belongs to exactly one user
- **Foreign Key**: `sessions.user_id` references `users.id`

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "User registered successfully"
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/auth/logout`
Logout and invalidate session.

**Request Body (optional):**
```json
{
  "allDevices": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out from all devices"
}
```

#### GET `/api/auth/sessions`
Get all active sessions for the current user.

**Response:**
```json
{
  "success": true,
  "sessions": [
    {
      "id": "session_id",
      "ip": "192.168.1.1",
      "browserAgent": "Mozilla/5.0...",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### DELETE `/api/auth/sessions`
Logout from current device or all devices.

**Request Body:**
```json
{
  "allDevices": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out from all devices"
}
```

#### GET `/api/auth/me`
Get current authenticated user.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Usage in Components

### Server Components

```typescript
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/signin');
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### Client Components

```typescript
'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      // Redirect to dashboard or intended page
      window.location.href = '/dashboard';
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Security Features

### Session Security
- **120-bit entropy**: Session IDs and secrets have 120 bits of entropy
- **Separate ID and Secret**: Prevents timing attacks
- **SHA-256 Hashing**: Session secrets are hashed before storage
- **Constant-time Comparison**: Prevents timing attacks during validation

### Cookie Security
- **HttpOnly**: Prevents XSS attacks from accessing session token
- **Secure**: Only sent over HTTPS in production
- **SameSite=Lax**: Provides CSRF protection
- **24-hour expiration**: Automatic session cleanup

### Password Security
- **Bcrypt Hashing**: 12 salt rounds for secure password storage
- **Minimum Length**: 8 characters required
- **Email Validation**: Proper email format validation

## Environment Variables

Add these to your `.env.local`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database"
```

## Database Migration

Run the following command to generate and apply migrations:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Middleware Configuration

The middleware automatically:
- Protects routes under `/dashboard`, `/api/protected`, and feature routes
- Redirects unauthenticated users to `/signin`
- Redirects authenticated users away from auth pages
- Handles session validation and cleanup

## Session Management

Sessions are automatically:
- Created on successful login
- Validated on each request
- Expired after 24 hours
- Cleaned up when invalid

### Multi-Device Support
- **Multiple Sessions**: Users can be logged in on multiple devices simultaneously
- **Session Tracking**: Each session tracks IP address and browser agent
- **Selective Logout**: Users can logout from current device or all devices
- **Session Management**: View and manage all active sessions

### Session Relations
- **One-to-Many**: Each user can have multiple active sessions
- **Session Isolation**: Each session is independent and secure
- **Automatic Cleanup**: Expired sessions are automatically removed
- **Device Tracking**: Sessions include IP and browser information for security

The system tracks:
- User IP address
- Browser user agent
- Session creation time
- Automatic expiration
- Device relationships

This provides a robust foundation for user authentication with security best practices from Lucia Auth. 