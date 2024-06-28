import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import { Start } from './assets/components/start';
import Play from './assets/components/play';
import End from "./assets/components/end";

export default function App() {
  const [highScore, setHighScore] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/play" element={<Play highScore={highScore} setHighScore={setHighScore} />} />
        <Route path="/endDefeated" element={<End defeated={true} />} />
        <Route path="/endVictory" element={<End defeated={false} />} />
      </Routes>
    </Router>
  );
}