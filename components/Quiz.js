import { useState } from 'react';

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

  return (
    <div className="w-full max-w-xl p-5 bg-white dark:bg-gray-700 rounded shadow-md">
      {currentQuestion < questions.length ? (
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">
              {questions[currentQuestion].question}
            </h2>
            <ul>
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index} className="mb-2">
                  <button
                    onClick={() => handleOptionClick(option)}
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
                </li>
              ))}
            </ul>
          </div>
          {showFeedback && (
            <div className="mb-4">
              {isCorrect ? (
                <p className="text-green-500">Correct!</p>
              ) : (
                <p className="text-red-500">
                  Incorrect! The correct answer is {questions[currentQuestion].answer}.
                </p>
              )}
            </div>
          )}
          {showFeedback && (
            <button
              onClick={handleNextQuestion}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Next Question
            </button>
          )}
        </>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-lg">Your score is {score} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
