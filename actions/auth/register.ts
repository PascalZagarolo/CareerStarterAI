"use server";

import { register as registerUser, getClientInfo } from '@/lib/auth';

export async function register(formData: FormData) {
    try {
        // Get form data
        const name = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        const acceptTerms = formData.get('acceptTerms') === 'on';

        // Validate form data
        if (!name || !email || !password || !confirmPassword) {
            return { error: "All fields are required" };
        }

        if (password !== confirmPassword) {
            return { error: "Passwords do not match" };
        }

        if (password.length < 8) {
            return { error: "Password must be at least 8 characters long" };
        }

        if (!acceptTerms) {
            return { error: "You must accept the Terms and Conditions to continue" };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { error: "Invalid email format" };
        }

        // Get client info for session tracking
        const { ip, userAgent } = await getClientInfo();

        // Register user
        const result = await registerUser(name, email, password);

        if (!result.success) {
            return { error: result.error };
        }

        if (!result.user) {
            return { error: "User creation failed" };
        }

        // Create session after successful registration
        const { createSession, setSessionCookie } = await import('@/lib/session');
        const session = await createSession(result.user.id, ip, userAgent);
        await setSessionCookie(session.token);

        return { success: true, user: result.user };

    } catch (error) {
        console.error('Registration error:', error);
        return { error: "Failed to register. Please try again." };
    }
}