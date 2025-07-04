import './App.css'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/game/:gameId" element={<GamePage />} />
    </Routes>
  )
}

export default App
