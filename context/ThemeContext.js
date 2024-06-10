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
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">Quiz Application</h1>
        </div>
        {session && (
          <div className="flex items-center space-x-4">
            <img src={session.user.image} alt={session.user.name} className="w-10 h-10 rounded-full" />
            <h2 className="text-xl font-semibold">Welcome, {session.user.name}</h2>
            <button onClick={() => signOut()} className="btn">Sign out</button>
          </div>
        )}
      </header>
      <main className="flex-1 w-full flex items-center justify-center">
        {session ? <Quiz /> : (
          <div className="text-center">
            <img src="/welcome_image.png" alt="Welcome" className="mb-4" />
            <div>Please sign in to take the quiz.</div>
            <button onClick={() => signIn('google')} className="btn mt-2">Sign in with Google</button>
          </div>
        )}
      </main>
    </div>
  );
}
