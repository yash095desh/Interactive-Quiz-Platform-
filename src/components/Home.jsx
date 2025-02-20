import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <div className="bg-white text-blue-600 text-center p-8 rounded-lg shadow-2xl ">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz App</h1>
        <p className="text-lg mb-6">
          Test your knowledge with our fun and interactive quiz!
        </p>
        <button
            onClick={()=>navigate("/quiz")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
