"use server";

import { logout } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function logoutUser(allDevices: boolean = false) {
    try {
        const result = await logout(allDevices);

        if (!result.success) {
            return { error: result.error };
        }

        // Redirect to home page after logout
        redirect('/');

    } catch (error) {
        console.error('Logout error:', error);
        return { error: "Failed to logout. Please try again." };
    }
} 