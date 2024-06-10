import { useSession, signIn, signOut } from 'next-auth/react'
import Quiz from '../components/Quiz'
import ThemeToggle from '../components/ThemeToggle'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="container mx-auto p-4">
      <ThemeToggle />
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quiz Application</h1>
        {session ? (
          <div className="flex items-center space-x-4">
            <img src={session.user.image} alt={session.user.name} className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="text-xl font-semibold">Welcome, {session.user.name}</h2>
              <button onClick={() => signOut()} className="btn mt-2">Sign out</button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold">Please sign in to take the quiz</h2>
            <button onClick={() => signIn('google')} className="btn mt-2">Sign in with Google</button>
          </div>
        )}
      </header>
      {session && <Quiz />}
    </div>
  )
}


