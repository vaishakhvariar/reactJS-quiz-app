import './App.css'
import { Routes, Route } from 'react-router-dom';
import TopicSelection from './components/TopicSelection';
import Quiz from './components/Quiz';


function App() {
  return (
    <Routes>
      <Route path="/" element={<TopicSelection />} />
      <Route path="/quiz/:category/:difficulty" element={<Quiz />} />
    </Routes>
  );
}

export default App;
