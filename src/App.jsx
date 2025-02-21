import LandingPage from "./components/LandingPage"
import CreateQuiz from "./components/CreateQuiz"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TakeQuiz from "./components/TakeQuiz";
import PrevQuiz from "./components/PrevQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/takequiz" element={<TakeQuiz />} />
        <Route path="/prevquiz" element={<PrevQuiz />} />
      </Routes>
    </Router>
  )
}

export default App
