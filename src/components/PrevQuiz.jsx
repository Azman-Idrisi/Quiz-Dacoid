import React, { useState, useEffect } from "react";
import { History, ChevronDown, Trophy, Timer, Brain } from "lucide-react";
import gsap from "gsap";

// Mock data structure for previous quizzes
const mockPreviousQuizzes = [
  {
    id: 1,
    date: "2024-02-22",
    title: "General Knowledge",
    score: 8,
    totalQuestions: 10,
    timeSpent: "4:30",
    questions: [
      { question: "What is the capital of France?", answer: "Paris", correct: true },
      { question: "Which planet is known as the Red Planet?", answer: "Mars", correct: true },
    ]
  },
  {
    id: 2,
    date: "2024-02-21",
    title: "Science Quiz",
    score: 7,
    totalQuestions: 10,
    timeSpent: "5:45",
    questions: [
      { question: "What is the largest mammal?", answer: "Blue Whale", correct: true },
      { question: "Which gas do plants absorb?", answer: "Carbon Dioxide", correct: true },
    ]
  }
];

const PrevQuiz = () => {
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const ctx = gsap.context(() => {
      // Animate the header
      gsap.from(".header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Animate the quiz cards
      gsap.from(".quiz-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        onComplete: () => setIsLoading(false)
      });
    });

    return () => ctx.revert();
  }, []);

  const toggleQuiz = (id) => {
    gsap.to(`.details-${id}`, {
      height: expandedQuiz === id ? 0 : "auto",
      duration: 0.5,
      ease: "power2.inOut"
    });
    setExpandedQuiz(expandedQuiz === id ? null : id);
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      {/* Header */}
      <div className="header max-w-4xl mx-auto mb-8 flex items-center gap-3">
        <History className="w-8 h-8 text-purple-400" />
        <h1 className="text-2xl font-bold text-white">Quiz History</h1>
      </div>

      {/* Stats Overview */}
      <div className="header max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <div>
            <p className="text-gray-400 text-sm">Best Score</p>
            <p className="text-white font-bold">80%</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-3">
          <Timer className="w-6 h-6 text-blue-400" />
          <div>
            <p className="text-gray-400 text-sm">Average Time</p>
            <p className="text-white font-bold">5:12</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-3">
          <Brain className="w-6 h-6 text-purple-400" />
          <div>
            <p className="text-gray-400 text-sm">Total Quizzes</p>
            <p className="text-white font-bold">{mockPreviousQuizzes.length}</p>
          </div>
        </div>
      </div>

      {/* Quiz List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {mockPreviousQuizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card bg-gray-900 rounded-xl overflow-hidden">
            {/* Quiz Header */}
            <div
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleQuiz(quiz.id)}
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <h3 className="text-white font-medium">{quiz.title}</h3>
                  <p className="text-gray-400 text-sm">{quiz.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`font-bold ${getScoreColor(quiz.score, quiz.totalQuestions)}`}>
                    {quiz.score}/{quiz.totalQuestions}
                  </p>
                  <p className="text-gray-400 text-sm">{quiz.timeSpent}</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedQuiz === quiz.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Quiz Details */}
            <div className={`details-${quiz.id} h-0 overflow-hidden`}>
              <div className="p-4 pt-0 border-t border-gray-800">
                <h4 className="text-gray-400 mb-2 text-sm">Questions</h4>
                <div className="space-y-2">
                  {quiz.questions.map((q, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className={q.correct ? "text-green-400" : "text-red-400"}>
                        {q.correct ? "✓" : "✗"}
                      </span>
                      <div>
                        <p className="text-white text-sm">{q.question}</p>
                        <p className="text-gray-400 text-sm">Answer: {q.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrevQuiz;