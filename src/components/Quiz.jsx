import { useState, useEffect } from "react";
import questions from "../data/questions.json";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showAns, setShowAns] = useState(false);
  const navigate = useNavigate()

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft === 0) nextQuestion();
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);


  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      let newScore = score + 1;
      localStorage.setItem("quizScore", newScore);
      setScore((prevScore) => prevScore + 1);
      toast.success("Correct");
    } else {
      toast.error("Incorrect");
    }
    setShowAns(true);
    setTimeout(nextQuestion, 1500);
  };

  // Moves to the next question or redirects to the result page
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowAns(false);
      setSelectedOption("");
      setTimeLeft(30);
    } else {
      navigate("/result")
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col gap-2 w-full max-w-md">
        <h2 className="text-xl text-gray-700 font-semibold mb-2">
          Question {currentQuestion + 1}/{questions.length}
        </h2>

        <p>{questions[currentQuestion].question}</p>

        {/* Multiple Choice Question */}
        {questions[currentQuestion].type === "mcq" &&
          questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`p-2 rounded-2xl border cursor-pointer ${
                showAns
                  ? questions[currentQuestion].answer === option
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              {option}
            </button>
          ))}

        {/* Integer Type Question */}
        {questions[currentQuestion].type === "integer" && (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAnswer(Number(e.target.option.value));
              }}
              className="flex items-center gap-2 justify-between"
            >
              <input
                type="number"
                name="option"
                id="option"
                value={selectedOption}
                onChange={(ev) => setSelectedOption(ev.target.value)}
                className="px-4 py-2 w-full border-gray-300 border rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                Submit
              </button>
            </form>
            {showAns && selectedOption && (
              <p
                className={`px-3 py-2 mt-2 border rounded-lg ${
                  questions[currentQuestion].answer == selectedOption
                    ? "border-green-300 bg-green-50 text-green-500"
                    : "border-red-300 bg-red-50 text-red-500"
                }`}
              >
                Ans: {questions[currentQuestion].answer}
              </p>
            )}
          </div>
        )}

        <p>⏳ Time left: {timeLeft}s</p>
      </div>
    </div>
  );
};

export default Quiz;
