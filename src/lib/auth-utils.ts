import { getCurrentUser } from './auth';

/**
 * Get the current authenticated user
 * @returns The current user object or null if not authenticated
 */
export async function getCurrentUserOrNull() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Check if a user is authenticated
 * @returns true if user is authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUserOrNull();
  return user !== null;
} 