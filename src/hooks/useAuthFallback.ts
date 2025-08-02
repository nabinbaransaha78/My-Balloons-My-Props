import { useAuth as useClerkAuth } from '@clerk/clerk-react';

interface AuthState {
  isSignedIn: boolean;
  isLoaded: boolean;
  user?: any;
}

export const useAuthFallback = (): AuthState => {
  try {
    // Try to use Clerk auth if available
    const auth = useClerkAuth();
    return {
      isSignedIn: auth.isSignedIn || false,
      isLoaded: auth.isLoaded || false,
      user: auth.user
    };
  } catch (error) {
    // Return fallback values if Clerk is not available
    return {
      isSignedIn: false,
      isLoaded: true,
      user: undefined
    };
  }
};
