import { getCurrentUserOrNull } from '@/lib/auth-utils';
import { AuthProvider } from './auth-wrapper';

interface AuthProviderServerProps {
  children: React.ReactNode;
}

export async function AuthProviderServer({ children }: AuthProviderServerProps) {
  // Get initial user data on the server
  const initialUser = await getCurrentUserOrNull();

  return (
    <AuthProvider initialUser={initialUser}>
      {children}
    </AuthProvider>
  );
} 