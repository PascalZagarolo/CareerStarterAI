"use server";

import { logout } from '@/lib/auth';

export async function signout() {
    try {
        const result = await logout(false);
        if (!result.success) {
            return { error: result.error };
        }
        return { success: true };
    } catch (error) {
        console.error('Signout error:', error);
        return { error: "Failed to sign out. Please try again." };
    }
}
