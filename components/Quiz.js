import { useState, useEffect } from 'react';

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
  const [timeLeft, setTimeLeft] = useState(60);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleNextQuestion();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleOptionClick = (option) => {
    if (selectedOption === null) {
      setSelectedOption(option);
      setShowFeedback(true);
      const correct = option === questions[currentQuestion].answer;
      setIsCorrect(correct);
      setUserAnswers([
        ...userAnswers,
        { question: questions[currentQuestion].question, selectedOption: option, isCorrect: correct },
      ]);
      if (correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(false);
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(60);
    } else {
      // Quiz completed
      setShowFeedback(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setTimeLeft(60);
    setUserAnswers([]);
  };

  return (
    <div className="w-full max-w-xl p-5 bg-white dark:bg-gray-700 rounded shadow-md">
      {currentQuestion < questions.length ? (
        <>
          <div className="mb-4 text-center">
            <div className="text-lg font-bold p-2 border rounded bg-blue-100 text-blue-800">
              Time left: {timeLeft} seconds
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">
              {questions[currentQuestion].question}
            </h2>
            <ul>
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index} className="mb-2">
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
                </li>
              ))}
            </ul>
          </div>
          {showFeedback && (
            <div className="mb-4">
              {isCorrect ? (
                <p className="text-green-500">Correct!</p>
              ) : (
                <p className="text-red-500">Incorrect!</p>
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
        <div className="text-center">
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
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Review your answers:</h3>
            <ul>
              {userAnswers.map((answer, index) => (
                <li key={index} className="mb-2">
                  <p>{answer.question}</p>
                  <p>
                    Your answer:{" "}
                    <span
                      className={
                        answer.isCorrect ? "text-green-500" : "text-red-500"
                      }
                    >
                      {answer.selectedOption}
                    </span>
                  </p>
                  {!answer.isCorrect && (
                    <p>Correct answer: {questions[index].answer}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;

