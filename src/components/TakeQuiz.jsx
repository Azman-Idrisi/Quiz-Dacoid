import React, { useState, useEffect, useCallback } from "react";
import { BrainCircuit, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveQuizResult } from "@/utils/indexedDB";

const quizQuestions = [
  {
    id: 1,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correct: "Mercury",
  },
  {
    id: 2,
    question:
      "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correct: "Queue",
  },
  {
    id: 3,
    question:
      "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    correct: "HTML",
  },
  {
    id: 4,
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    correct: "Au",
  },
  {
    id: 5,
    question:
      "Which of these processes is not typically involved in refining petroleum?",
    options: [
      "Fractional distillation",
      "Cracking",
      "Polymerization",
      "Filtration",
    ],
    correct: "Filtration",
  },
  {
    id: 6,
    question: "What is the value of 12 + 28?",
    options: null,
    correct: "40",
  },
  {
    id: 7,
    question: "How many states are there in the United States?",
    options: null,
    correct: "50",
  },
  {
    id: 8,
    question: "In which year was the Declaration of Independence signed?",
    options: null,
    correct: "1776",
  },
  {
    id: 9,
    question: "What is the value of pi rounded to the nearest integer?",
    options: null,
    correct: "3",
  },
  {
    id: 10,
    question:
      "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    options: null,
    correct: "120",
  },
];

const TakeQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState(""); // New state for typed answers
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [timer, setTimer] = useState(30);
  const [quizOver, setQuizOver] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const navigate = useNavigate();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isTypedAnswer = currentQuestion.options === null;

  const handleNextQuestion = useCallback(() => {
    const userAnswer = isTypedAnswer ? typedAnswer.trim() : selectedAnswer;
    const isCorrect =
      userAnswer.toLowerCase() === currentQuestion.correct.toLowerCase();

    setAttempts((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selected: userAnswer,
        correct: currentQuestion.correct,
        status: isCorrect ? "✅" : "❌",
      },
    ]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setSelectedAnswer(null);
    setTypedAnswer("");

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30);
    } else {
      setQuizOver(true);
    }
  }, [currentQuestion, currentQuestionIndex, selectedAnswer, typedAnswer]);

  useEffect(() => {
    if (quizOver) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const quizResult = {
        date: new Date().toISOString().split("T")[0],
        title: "General Knowledge",
        score,
        totalQuestions: quizQuestions.length,
        timeSpent,
        questions: attempts,
      };
      saveQuizResult(quizResult).then(() =>
        console.log("Quiz saved successfully!")
      );
    }
  }, [quizOver]);

  useEffect(() => {
    if (quizOver) return;

    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [quizOver, handleNextQuestion]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative px-4">
      <div className="logo flex items-center gap-2 mb-6">
        <BrainCircuit className="w-8 h-8 text-orange-400 rotate-90" />
        <span className="text-white text-xl font-semibold">Take a Quiz</span>
      </div>
      {!quizOver ? (
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full text-white text-center">
          <div className="flex items-center justify-center gap-2 text-lg mb-4">
            <Clock className="text-red-400" />
            <span
              className={`font-bold ${
                timer < 10 ? "text-red-400" : "text-green-400"
              }`}
            >
              {timer}s
            </span>
          </div>
          <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>

          {!isTypedAnswer ? (
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full px-4 py-2 border rounded-md ${
                    selectedAnswer === option
                      ? option === currentQuestion.correct
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-gray-800 text-gray-200 hover:bg-purple-500"
                  }`}
                  disabled={!!selectedAnswer}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white"
              placeholder="Type your answer..."
            />
          )}

          {selectedAnswer || (isTypedAnswer && typedAnswer) ? (
            <button
              onClick={handleNextQuestion}
              className="mt-4 bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors"
            >
              Next Question
            </button>
          ) : null}
        </div>
      ) : (
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-4">
            Your Score:{" "}
            <span className="text-green-400">
              {score}/{quizQuestions.length}
            </span>
          </p>
        </div>
      )}
      <div className="flex gap-4 items-center justify-center">
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors"
        >
          Retry Quiz
        </button>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default TakeQuiz;
