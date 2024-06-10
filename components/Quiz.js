import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (option) => {
    if (selectedOption === null) {
      setSelectedOption(option);
      setShowFeedback(true);
      if (option === questions[currentQuestion].answer) {
        setIsCorrect(true);
        setScore(score + 1);
      } else {
        setIsCorrect(false);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  return (
    <div className="w-full max-w-xl p-5 bg-white dark:bg-gray-700 rounded shadow-md">
      <AnimatePresence exitBeforeEnter>
        {currentQuestion < questions.length ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">
                {questions[currentQuestion].question}
              </h2>
              <ul>
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mb-2"
                  >
                    <button
                      onClick={() => handleOptionClick(option)}
                      disabled={selectedOption !== null}
                      className={`w-full p-2 border rounded ${
                        selectedOption === option
                          ? isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
            {showFeedback && (
              <div className="mb-4">
                {isCorrect ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-500"
                  >
                    Correct!
                  </motion.p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500"
                  >
                    Incorrect! The correct answer is {questions[currentQuestion].answer}.
                  </motion.p>
                )}
              </div>
            )}
            {showFeedback && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleNextQuestion}
                className="p-2 bg-blue-500 text-white rounded"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Restart Quiz'}
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="quiz-complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-lg">
              Your score is {score} out of {questions.length}
            </p>
            <button
              onClick={handleRestartQuiz}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
