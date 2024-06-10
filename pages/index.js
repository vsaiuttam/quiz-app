import { useContext } from 'react';
import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import ThemeContext from '../context/ThemeContext';
import Quiz from '../components/Quiz';

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: session } = useSession();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <motion.header 
        className="w-full p-5 flex justify-between items-center bg-opacity-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </motion.div>
      </motion.header>
      <motion.main
        className="flex-1 w-full flex flex-col items-center justify-center p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {session ? (
          <Quiz />
        ) : (
          <div className="flex flex-col items-center">
            <motion.h1
              className="text-3xl font-bold mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to the Quiz App
            </motion.h1>
            <motion.p
              className="mb-6 text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Please sign in to take the quiz.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signIn('google')}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md"
            >
              Sign in with Google
            </motion.button>
          </div>
        )}
      </motion.main>
    </div>
  );
}
