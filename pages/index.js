import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { signIn, signOut, useSession } from 'next-auth/react';
import Quiz from '../components/Quiz';

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { data: session } = useSession();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        {session ? (
          <Quiz />
        ) : (
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">📝 Please sign in to take the quiz! 🖋️</div>
            <div className="text-lg">👉 Click the button below to sign in with Google. 👈</div>
            <button onClick={() => signIn('google')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Sign in with Google</button>
          </div>
        )}
      </main>
    </div>
  );
}
