import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignIn() {
  useEffect(() => {
    signIn('google');
  }, []);

  return <div>Signing in...</div>;
}
