import { useEffect, useState, useRef } from "react";
import { getQuizHistory, clearQuizHistory } from "../utils/indexedDB";
import { Trash2, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const PrevQuiz = () => {
  const [quizHistory, setQuizHistory] = useState([]);
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transform = "translateY(50px)";
    }
    if (titleRef.current) {
      titleRef.current.style.opacity = "0";
      titleRef.current.style.transform = "scale(0.8)";
    }

    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power2.out",
      });

      gsap.to(titleRef.current, {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)",
        delay: 0.2,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getQuizHistory();
      setQuizHistory(data);
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    if (quizHistory.length > 0 && cardsContainerRef.current) {
      const cards = cardsContainerRef.current.children;

      gsap.set(cards, {
        opacity: 0,
        y: 20,
      });

      gsap.to(cards, {
        duration: 0.4,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });
    }
  }, [quizHistory]);

  const handleClearHistory = async () => {
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.children;

      await gsap.to(cards, {
        duration: 0.3,
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.in",
      });
    }

    await clearQuizHistory();
    setQuizHistory([]);
  };

  const handleNavigateHome = () => {
    gsap.to(containerRef.current, {
      duration: 0.5,
      y: -30,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => navigate("/"),
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div
        ref={containerRef}
        className="max-w-3xl w-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
      >
        <div ref={titleRef} className="flex items-center justify-center mb-6">
          <History className="w-8 h-8 text-blue-400" />
          <h2 className="text-3xl font-bold text-center ml-3">
            Previous Quizzes
          </h2>
        </div>

        {quizHistory.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">
            No quiz history found.
          </p>
        ) : (
          <div ref={cardsContainerRef} className="space-y-4">
            {quizHistory.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600 hover:scale-105 transition-transform duration-200"
              >
                <h3 className="text-xl font-semibold text-blue-300">
                  {quiz.title} - {quiz.date}
                </h3>
                <p className="text-gray-300">
                  Score:{" "}
                  <span className="font-bold text-green-400">
                    {quiz.score}/{quiz.totalQuestions}
                  </span>
                </p>
                <p className="text-gray-300">
                  Time Spent: {quiz.timeSpent} sec
                </p>
              </div>
            ))}
          </div>
        )}

        {quizHistory.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-red-600 transition-all"
          >
            <Trash2 className="w-5 h-5" /> Clear History
          </button>
        )}
        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={handleNavigateHome}
            className="mt-4 bg-purple-500 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrevQuiz;
