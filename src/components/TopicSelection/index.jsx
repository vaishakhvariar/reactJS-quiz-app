import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Quiz from '../Quiz';
import styled from 'styled-components';

const TopicSelection = () => {

    // const [quiz, setQuiz] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(''); 
    const [selectedDifficulty, setSelectedDifficulty] = useState(''); 
    // const [selection, setSelection] = useState([]);
    const navigate = useNavigate();


    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    const handleDifficultyChange = (event) => {
      setSelectedDifficulty(event.target.value);
    };
  
    const handleQuizStart = (event) => {
      event.preventDefault();
      if(selectedCategory&&selectedDifficulty){
        setSelectedCategory(selectedCategory);
        setSelectedDifficulty(selectedDifficulty);

        navigate(`/quiz/${selectedCategory}/${selectedDifficulty}`);
    }
  }

    return (
        <CardContainer className='quiz-container'>
            <h1>Topic Selection </h1>
            <form onSubmit={handleQuizStart}>
                <FormGroup>
                {/* <label htmlFor="category">Select Category:</label> */}
                <StyledSelect id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select a category</option>
                    <option value="Linux">Linux</option>
                    <option value="SQL">SQL</option>
                    <option value="DevOps">DevOps</option>
                    {/* <option value='Javascript'>JavaScript</option> */}
                </StyledSelect>
                </FormGroup>
                <FormGroup>
                {/* <label htmlFor="difficulty">Select Difficulty:</label> */}
                <StyledSelect id="difficulty" value={selectedDifficulty} onChange={handleDifficultyChange}>
                    <option value="">Select a difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </StyledSelect>
                </FormGroup>

                <StartButton type="submit">Start Quiz</StartButton>
            </form>
            {/* <Link to={`/quiz?category=${selectedCategory}&difficulty=${selectedDifficulty}`}></Link> */}
            {/* <Quiz selection={selection} /> */}
        </CardContainer>
    )

}

const CardContainer = styled.div`
  border: 1px solid #fff;
  border-radius: 10px;
  background-color:#4caf50;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #5ac26b;
  border-radius: 5px;
  appearance: none; 
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23444444" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 20px;
  cursor: pointer;

  &:hover {
    border-color: #aaa;
  }
`;

const StartButton = styled.button`
  background-color: #5ac26b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export default TopicSelection;