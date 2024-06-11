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
            <img src="/quiz-app/public/images/png.png" alt="404" className="mb-4 w-48 h-48 object-cover" />
            <div className="text-lg">Please sign in to take the quiz.</div>
          </div>
        )}
      </main>
    </div>
  );
}
