import React, { useState, useEffect } from "react";
import { BrainCircuit } from "lucide-react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState("one-word");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    gsap.from(".animated-item", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power1.out",
      clearProps: "all",
    });

    gsap.from(".background-effect", {
      opacity: 0,
      scale: 0.8,
      duration: 1.5,
      ease: "power2.out",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ question, answerType, answer });
    alert("Quiz Question Added!");
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="font-poppins min-h-screen bg-black flex flex-col items-center justify-center relative px-4">
      {/* Background Decoration */}
      <div className="background-effect absolute top-10 left-10 opacity-20">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="text-purple-300"
        >
          <path
            d="M10,50 Q25,25 50,50 T90,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="background-effect absolute bottom-10 right-10 opacity-20">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="text-purple-300"
        >
          <path
            d="M10,50 Q25,25 50,50 T90,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Header */}
      <div className="logo flex items-center gap-2 mb-6">
        <BrainCircuit className="w-8 h-8 text-orange-400 rotate-90" />
        <span className="text-white text-xl font-semibold">Create a Quiz</span>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full"
      >
        {/* Question Field */}
        <div className="mb-4">
          <label className="animated-item text-white block mb-2 text-lg font-medium">
            Add Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="animated-item w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type your question..."
          />
        </div>

        {/* Answer Type Selection */}
        <div className="mb-4">
          <label className="animated-item text-white block mb-2 text-lg font-medium">
            Select Answer Type
          </label>
          <select
            value={answerType}
            onChange={(e) => setAnswerType(e.target.value)}
            className="animated-item w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="one-word">One Word</option>
            <option value="written">Written</option>
          </select>
        </div>

        {/* Answer Input */}
        <div className="mb-6">
          <label className="animated-item text-white block mb-2 text-lg font-medium">
            Answer
          </label>
          {answerType === "one-word" ? (
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              className="animated-item w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter one-word answer..."
            />
          ) : (
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              className="animated-item w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your answer..."
              rows="4"
            ></textarea>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="animated-item w-full bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors"
        >
          Add Question
        </button>

        {/* Go Back Button */}
        <button
          type="button"
          className="animated-item w-full mt-4 bg-gray-700 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
