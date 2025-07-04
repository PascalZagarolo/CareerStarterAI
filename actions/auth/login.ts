"use server";

import { login, getClientInfo } from '@/lib/auth';

export async function loginUser(formData: FormData) {
    try {
        // Get form data
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Validate form data
        if (!email || !password) {
            return { error: "Email and password are required" };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { error: "Invalid email format" };
        }

        // Get client info for session tracking
        const { ip, userAgent } = await getClientInfo();

        // Attempt login
        const result = await login(email, password, ip, userAgent);

        if (!result.success) {
            return { error: result.error };
        }

        return { success: true, user: result.user };

    } catch (error) {
        console.error('Login error:', error);
        return { error: "Failed to login. Please try again." };
    }
}
