import { ClerkProvider } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function hasClerk() {
  return Boolean(clerkKey);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  if (!clerkKey) {
    return children;
  }

  return (
    <ClerkProvider
      publishableKey={clerkKey}
      afterSignOutUrl="/"
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      appearance={{
        variables: {
          colorPrimary: '#00f5d4',
          colorBackground: '#050816',
          colorText: '#f8fafc',
          colorInputBackground: '#020617',
          borderRadius: '8px'
        },
        elements: {
          cardBox: 'clerk-card',
          formButtonPrimary: 'clerk-primary'
        }
      }}
    >
      {children}
    </ClerkProvider>
  );
}
