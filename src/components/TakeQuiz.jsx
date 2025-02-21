import React, { useState, useEffect, useCallback } from "react";
import { BrainCircuit, Clock } from "lucide-react";
import gsap from "gsap";

const quizQuestions = [
  { id: 1, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris" },
  { id: 2, question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: "Mars" },
  { id: 3, question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], correct: "Blue Whale" },
  { id: 4, question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: "Carbon Dioxide" },
];

const TakeQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [timer, setTimer] = useState(30);
  const [quizOver, setQuizOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleNextQuestion = useCallback(() => {
    setAttempts((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selected: selectedAnswer,
        correct: currentQuestion.correct,
        status: selectedAnswer === currentQuestion.correct ? "✅" : "❌",
      },
    ]);

    setSelectedAnswer(null);
    setFeedback("");

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(30);
    } else {
      setQuizOver(true);
    }
  }, [currentQuestion, currentQuestionIndex, selectedAnswer]);

  // Handle initial animations
  useEffect(() => {
    setIsLoading(true);
    const ctx = gsap.context(() => {
      gsap.from(".animated-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        onComplete: () => setIsLoading(false)
      });

      gsap.from(".background-effect", {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [currentQuestionIndex, quizOver]);

  // Handle timer
  useEffect(() => {
    if (isLoading || quizOver) return;

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
  }, [isLoading, quizOver, handleNextQuestion]);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct) {
      setFeedback("✅ Correct!");
      setScore((prev) => prev + 1);
    } else {
      setFeedback("❌ Wrong!");
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAttempts([]);
    setQuizOver(false);
    setTimer(30);
    setSelectedAnswer(null);
    setFeedback("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative px-4">
      {/* Background Decoration */}
      <div className="background-effect absolute top-10 left-10 opacity-20">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-purple-300">
          <path d="M10,50 Q25,25 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="background-effect absolute bottom-10 right-10 opacity-20">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-purple-300">
          <path d="M10,50 Q25,25 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Header */}
      <div className="logo flex items-center gap-2 mb-6 animated-item">
        <BrainCircuit className="w-8 h-8 text-orange-400 rotate-90" />
        <span className="text-white text-xl font-semibold">Take a Quiz</span>
      </div>

      {/* Quiz Content */}
      {!quizOver ? (
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full text-white text-center">
          {/* Timer */}
          <div className="animated-item flex items-center justify-center gap-2 text-lg mb-4">
            <Clock className="text-red-400" />
            <span className={`font-bold ${timer < 10 ? "text-red-400" : "text-green-400"}`}>
              {timer}s
            </span>
          </div>

          {/* Question */}
          <h2 className="animated-item text-xl font-bold mb-4">{currentQuestion.question}</h2>

          {/* Options */}
          <div className="animated-item flex flex-col gap-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(option)}
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

          {/* Feedback */}
          {feedback && <p className="animated-item mt-4 text-lg font-semibold">{feedback}</p>}

          {/* Next Button */}
          {selectedAnswer && (
            <button
              onClick={handleNextQuestion}
              className="animated-item mt-4 bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors"
            >
              Next Question
            </button>
          )}
        </div>
      ) : (
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full text-white text-center">
          <h2 className="animated-item text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="animated-item text-lg mb-4">Your Score: <span className="text-green-400">{score}/{quizQuestions.length}</span></p>

          {/* Attempt History */}
          <div className="animated-item text-left">
            <h3 className="text-lg font-bold mb-2">Attempt History:</h3>
            <ul className="text-sm">
              {attempts.map((attempt, index) => (
                <li key={index} className="mb-2">
                  <span className="text-purple-300">{attempt.question}</span> → <span className="text-yellow-400">{attempt.selected}</span> {attempt.status}
                </li>
              ))}
            </ul>
          </div>

          {/* Restart Quiz */}
          <button
            onClick={handleRestart}
            className="animated-item mt-4 bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors"
          >
            Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;