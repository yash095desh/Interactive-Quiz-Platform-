import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAttempts, saveAttempt } from "../utils/db";

const Result = () => {
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the quiz score from localStorage
    const quizScore = Number(localStorage.getItem("quizScore"));
    const isQuizCompleted = localStorage.getItem("quizStatus") == "completed";
    console.log(isQuizCompleted);

    if (quizScore) {
      // Update the score state
      setScore(quizScore);
      // Save the attempt in IndexedDB (prevents duplicate saves)
      if (!isQuizCompleted) {
        saveAttempt({ date: new Date().toLocaleString(), quizScore });
        localStorage.setItem("quizStatus", "completed");
      }
    }

    // Fetch and update the previous attempts history
    getAttempts().then(setHistory);
  }, [score]);

  // Function to return a message based on the score
  const getMessage = () => {
    if (score > 8) return "🎉 Excellent! You did great!";
    if (score > 5) return "😊 Good job! Keep improving.";
    return "😢 Don't worry, try again!";
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* Quiz Result Card */}
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700">
          Quiz Completed!
        </h2>

        {/* Display user's score */}
        <p className="text-lg mt-2">
          Your Score: <span className="font-bold text-blue-500">{score}</span>
        </p>

        {/* Display message based on performance */}
        <p className="text-gray-600 mt-2">{getMessage()}</p>

        {/* Previous Attempts Section */}
        {history.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-2">Previous Attempts:</h3>
            <ul className="space-y-2">
              {history.map((attempt, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-3 rounded-lg shadow-md"
                >
                  <span className="font-medium text-gray-700">
                    {attempt.date}
                  </span>
                  <span className="text-gray-600"> - Score: </span>
                  <span className="font-bold text-blue-600">
                    {attempt.quizScore}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Button to restart the quiz */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => {
            navigate("/");
            localStorage.setItem("quizStatus", "pending");
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Result;
