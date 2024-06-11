import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { signIn, signOut, useSession } from 'next-auth/react';
import Quiz from '../components/Quiz';
import Image from 'next/image';

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: session } = useSession();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-${theme === 'dark' ? 'gray-800' : 'white'} text-${theme === 'dark' ? 'white' : 'black'} transition-all duration-300`}>
      <header className="w-full p-5 flex justify-between items-center bg-${theme === 'dark' ? 'gray-900' : 'gray-100'} shadow-md">
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          {session ? (
            <button onClick={() => signOut()} className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Sign out
            </button>
          ) : (
            <button onClick={() => signIn('google')} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Sign in with Google
            </button>
          )}
        </div>
      </header>
      <main className="flex-1 w-full flex items-center justify-center px-4">
        {session ? (
          <Quiz />
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <Image src="/quiz.jpg" alt="Quiz" width={200} height={200} className="mx-auto" />
            </div>
            <div className="text-lg font-semibold">Please sign in to take the quiz.</div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;


