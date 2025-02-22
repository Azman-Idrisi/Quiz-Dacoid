import React, { useEffect } from "react";
import { BrainCircuit } from "lucide-react";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import gsap from "gsap";
import { Navigate, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.to(".logo", {
      opacity: 1,
      y: -30,
      duration: 1,
      ease: "power2.out",
    });

    gsap.fromTo(
      ".animated-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all",
      }
    );

    gsap.from(".background-effect", {
      opacity: 1,
      scale: 0.8,
      duration: 1.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="font-poppins min-h-screen bg-black flex flex-col items-center justify-center relative px-4">
      {/* Abstract decorative elements */}
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

      <div className="background-effect absolute bottom-10 right-10 opacity-50">
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

      <div className="background-effect absolute bottom-10 left-10 opacity-50">
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

      <div className="background-effect absolute top-10 right-20 opacity-20">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="text-purple-100"
        >
          <path
            d="M10,50 Q25,25 50,50 T90,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="logo flex items-center gap-2 mb-4">
        <BrainCircuit className="w-8 h-8 text-orange-400 rotate-90" />
        <span className="text-white text-xl font-semibold">Quizzy</span>
      </div>

      <div className="text-center max-w-2xl">
        <p className="animated-item text-purple-400 uppercase tracking-wide text-sm mb-4">
          QUIZZES AT GLANCE
        </p>
        <h1 className="animated-item text-5xl md:text-6xl font-bold mb-4">
          <BackgroundBeamsWithCollision className="bg-transparent text-white mb-[-3rem]">
            Discover Your
          </BackgroundBeamsWithCollision>
          <br />
          <div className="animated-item bg-purple-400 text-black px-4 py-2 rounded-[10px] inline-block my-4">
            BRAIN POWER!
          </div>
          <br />
          <span className="animated-item text-purple-300">Today!</span>
        </h1>

        <p className="animated-item text-gray-400 mb-8">
          #1 Quiz Backed by Science
        </p>

        <div className="flex flex-col gap-3 w-full h-full justify-center">
          <button
            className="animated-item bg-purple-500 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors"
            onClick={() => navigate("/takequiz")}
          >
            Take the Quiz
          </button>
          <button
            className="animated-item bg-purple-500 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors"
            onClick={() => navigate("/prevquiz")}
          >
            View Previous Quiz
          </button>
          <button
            className="animated-item bg-purple-500 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors"
            onClick={() => navigate("/createquiz")}
          >
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
