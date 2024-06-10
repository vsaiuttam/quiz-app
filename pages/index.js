import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { signIn, signOut, useSession } from 'next-auth/react';
import Quiz from '../components/Quiz';

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: session } = useSession();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <header className="w-full p-5 flex justify-between items-center">
        <div className="flex items-center space-x-4">

        </div>
      </header>
      <main className="flex-1 w-full flex items-center justify-center">
        {session ? <Quiz /> : <div>Please sign in to take the quiz.</div>}
      </main>
    </div>
  );
}


