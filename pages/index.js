import { useState, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';
import { signIn, signOut, useSession } from 'next-auth/react';
import Quiz from '../components/Quiz';
import { FiSun, FiMoon } from 'react-icons/fi';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
    answer: "Harper Lee",
  },
  {
    question: "What is the speed of light?",
    options: ["299,792 km/s", "150,000 km/s", "3,000 km/s", "30,000 km/s"],
    answer: "299,792 km/s",
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Osmium", "Oganesson"],
    answer: "Oxygen",
  },
  {
    question: "What year did the Titanic sink?",
    options: ["1912", "1905", "1920", "1898"],
    answer: "1912",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
    answer: "Leonardo da Vinci",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Thailand", "Japan"],
    answer: "Japan",
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2",
  },
  {
    question: "Who is the author of '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.K. Rowling"],
    answer: "George Orwell",
  },
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { data: session } = useSession();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowFeedback(true);

    if (option === questions[currentQuestion].answer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <header className="w-full p-5 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 bg-gray-200 rounded">
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
            {session ? (
              <button onClick={handleSignOut} className="p-2 bg-red-500 text-white rounded">Sign out</button>
            ) : (
              <button onClick={() => signIn('google')} className="p-2 bg-blue-500 text-white rounded">Sign in with Google</button>
            )}
          </div>
        </header>
        <main className="flex-1 w-full flex items-center justify-center">
          {session ? (
            currentQuestion < questions.length ? (
              <Quiz
                question={questions[currentQuestion].question}
                options={questions[currentQuestion].options}
                selectedOption={selectedOption}
                showFeedback={showFeedback}
                isCorrect={isCorrect}
                handleOptionClick={handleOptionClick}
                handleNextQuestion={handleNextQuestion}
              />
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
                <p className="text-lg">Your score is {score} out of {questions.length}</p>
                <button onClick={() => setCurrentQuestion(0)} className="p-2 bg-blue-500 text-white rounded mt-4">Restart Quiz</button>
              </div>
            )
          ) : (
            <div>Please sign in to take the quiz.</div>
          )}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}
