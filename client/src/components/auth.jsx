import { RedirectToSignIn, SignedIn, SignedOut, SignIn, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { LogIn, UserRound } from 'lucide-react';
import { hasClerk } from '../providers/AuthProvider.jsx';

export function RequireAuth({ children }) {
  if (!hasClerk()) {
    return children;
  }

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><RedirectToSignIn /></SignedOut>
    </>
  );
}

export function AuthWidget() {
  if (!hasClerk()) {
    return (
      <Link to="/app" className="user-button">
        <UserRound size={18} /> Demo User
      </Link>
    );
  }

  return (
    <SignedIn>
      <UserButton afterSignOutUrl="/" />
    </SignedIn>
  );
}

export function AuthCta() {
  if (!hasClerk()) {
    return <Link to="/app" className="button small"><LogIn size={16} /> Demo Login</Link>;
  }

  return (
    <>
      <SignedOut>
        <Link to="/auth" className="button small"><LogIn size={16} /> Sign in</Link>
      </SignedOut>
      <SignedIn>
        <Link to="/app" className="button small">Open App</Link>
      </SignedIn>
    </>
  );
}

export function ClerkSignInPanel() {
  if (!hasClerk()) {
    return null;
  }

  return <SignIn routing="path" path="/auth" signUpUrl="/auth" fallbackRedirectUrl="/app" />;
}

export function UserName() {
  if (!hasClerk()) {
    return 'Praveen';
  }

  const { user } = useUser();
  return user?.firstName || user?.primaryEmailAddress?.emailAddress || 'Workspace';
}
