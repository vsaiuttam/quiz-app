import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { signIn, signOut, useSession } from 'next-auth/react';

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: session } = useSession();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-black  text-black'}`}>
      <header className="w-full p-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quiz App</h1>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 bg-gray-200 rounded">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          {session ? (
            <button onClick={() => signOut()} className="p-2 bg-red-500 text-white rounded">Sign out</button>
          ) : (
            <button onClick={() => signIn('google')} className="p-2 bg-blue-500 text-white rounded">Sign in with Google</button>
          )}
        </div>
      </header>
      <main className="flex-1 w-full flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;
