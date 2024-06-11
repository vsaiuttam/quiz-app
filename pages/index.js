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
          <h1 className="text-3xl font-bold">Quiz App</h1>
          <button
            onClick={toggleTheme}
            className="p-2 border rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div>
          {session ? (
            <button onClick={signOut} className="p-2 border rounded bg-blue-500 text-white">
              Sign Out
            </button>
          ) : (
            <button onClick={signIn} className="p-2 border rounded bg-blue-500 text-white">
              Sign In
            </button>
          )}
        </div>
      </header>
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        {session ? (
          <Quiz />
        ) : (
          <div className="text-center">
            <img src="/path-to-your-image.jpg" alt="Sign in" className="mb-4 w-48 h-48 object-cover" />
            <div className="text-lg">Please sign in to take the quiz.</div>
          </div>
        )}
      </main>
    </div>
  );
}




