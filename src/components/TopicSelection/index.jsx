import { useState, useEffect } from 'react';
import './index.css';
import Quiz from '../Quiz';

const TopicSelection = () => {

    // const [quiz, setQuiz] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(''); 
    const [selectedDifficulty, setSelectedDifficulty] = useState(''); 
    const [selection, setSelection] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const apiKey = 'PaM9NATVEd1imVikLrcE3UyGPvDFxYdA6Sx2Vug9';
    //     const apiUrl = 'https://quizapi.io/api/v1/questions';

    //     fetch(`${apiUrl}?apiKey=${apiKey}`)
    //     .then((response) => response.json())
    //     .then((data)=>{
    //         console.log(data);
    //         // console.log(typeof data);
    //         setLoading(false);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         setLoading(false);            
    //     });
    // }, []);

    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    const handleDifficultyChange = (event) => {
      setSelectedDifficulty(event.target.value);
    };
  
    const handleQuizStart = (event) => {
      event.preventDefault();
      setSelection([selectedCategory,selectedDifficulty]);
      console.log('Select1', selection)
    };

    useEffect(() => {
        console.log('Selection:', selection);
      }, [selection]); 


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
                    <option value='JavaScript'>JavaScript</option>
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