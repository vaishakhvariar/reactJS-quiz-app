import { useState } from 'react';
import './index.css';
import Quiz from '../Quiz';

const TopicSelection = () => {

    // const [quiz, setQuiz] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(''); 
    const [selectedDifficulty, setSelectedDifficulty] = useState(''); 
    const [selection, setSelection] = useState([]);


    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    const handleDifficultyChange = (event) => {
      setSelectedDifficulty(event.target.value);
    };
  
    const handleQuizStart = (event) => {
      event.preventDefault();
      if(selectedCategory&&selectedDifficulty){
      setSelection([selectedCategory,selectedDifficulty]);
      }
      console.log('Select1', selection)
    };

    return (
        <div className='quiz-container'>
            <h1>Topic Selection </h1>
            <form onSubmit={handleQuizStart}>
                <div>
                <label htmlFor="category">Select Category:</label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select a category</option>
                    <option value="Linux">Linux</option>
                    <option value="DevOps">DevOps</option>
                    <option value='Javascript'>JavaScript</option>
                </select>
                </div>
                <div>
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select id="difficulty" value={selectedDifficulty} onChange={handleDifficultyChange}>
                    <option value="">Select a difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                </div>

                <button type="submit">Start Quiz</button>
            </form>
            <Quiz selection={selection} />
        </div>
    )

}

export default TopicSelection;