// import './index.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';


const Quiz = () => {

    const [quiz, setQuiz] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const {category, difficulty} = useParams();
    console.log('Category:', category);
    console.log('Difficulty:', difficulty);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showVerifyAnswer, setShowVerifyAnswer] = useState(false);
    const [score, setScore] = useState(0);

    const api_data = (data) => {
        const new_data = [];
        data.forEach(element => {
            const question = element.question;
            const id = element.id;
            const options = Object.entries(element.answers);
            const answers = Object.entries(element.correct_answers).filter(entry => entry[1]==='true').map(entry => entry[0].slice(0, entry[0].lastIndexOf("_")));
            const new_data_element = {id, question, answers, options};
            new_data.push(new_data_element);            
        });
        return new_data;
    }


    useEffect(() => {
        const apiKey = 'PaM9NATVEd1imVikLrcE3UyGPvDFxYdA6Sx2Vug9';
        const apiUrl = 'https://quizapi.io/api/v1/questions';
        if(category&&difficulty){

        fetch(`${apiUrl}?apiKey=${apiKey}&difficulty=${difficulty}&category=${category}&limit=10`)
        .then((response) => response.json())
        .then((data)=>{
            if(data){
                console.log(data);
                const newData = api_data(data);
                // console.log(newData);
                setQuiz(newData);
            }

        })
        .catch(error => {
            console.error(error);          
        });
    }
    }, [category, difficulty]);

    const handleNextQuestion = () => {
        setCurrentQIndex((prevIndex)=>prevIndex+1);
        setSelectedOptions([]);
        setShowVerifyAnswer(false);
    }

    const handleOptionChange = (optionValue) => {
        setSelectedOptions ((prevSelected) => {
            if(prevSelected.includes(optionValue)){
                return prevSelected.filter((value) => value !== optionValue);
            } else {
                return [...prevSelected, optionValue];
            }
        });
    }

    const handleSubmitButton = (event) => {
        event.preventDefault();
        console.log('Selected Options:', selectedOptions); 
        setShowVerifyAnswer(true);       
    }

    useEffect(()=>{
        if(showVerifyAnswer&&selectedOptions.every((item)=>(quiz[currentQIndex].answers).includes(item))) {
            setScore((prevScore) => {
                return prevScore+1;
            }
            );
        }
    },[showVerifyAnswer, selectedOptions, quiz, currentQIndex])

    const VerifyAnswer = () => {

        if(!showVerifyAnswer) {
            return;
        }
        if(selectedOptions.every((item)=>(quiz[currentQIndex].answers).includes(item))){
            return (
                <div>
                    <p>You answered correctly</p>
                    <p>Current total: {score}</p>
                    <p>Questions so far: {currentQIndex+1}</p>
                </div>
            );
        }else{
            return (
                <div>
                    <p>Your answer is incorrect</p>
                    <p>Current total: {score}</p>
                    <p>Questions so far: {currentQIndex+1}</p>
                </div>
            )
        }
    }


    return (
      <QuizContainer>
        {currentQIndex < quiz.length ? (
            <CardContainer>
                {/* <p>{quiz[currentQIndex].id}</p> */}
                <Question>{quiz[currentQIndex].question}</Question>
                <OptionList>{quiz[currentQIndex].options.filter(item => item[1]).map((option, index) => (
                    <OptionItem key={option[0] }>
                        <OptionCheckbox
                        type='checkbox' 
                        id={option[0]} 
                        value={option[1]}
                        checked={selectedOptions.includes(option[0])}
                        onChange={() => {
                            handleOptionChange(option[0]); 
                        }} />
                        <label htmlFor={option[0]}>{index+1} {option[1]}</label>
                    </OptionItem>
                ))}</OptionList>
                <SubmitButton onClick={handleSubmitButton}>Submit</SubmitButton>
                <VerifyAnswer />
                <SubmitButton disabled={!showVerifyAnswer} onClick={handleNextQuestion}>Next</SubmitButton>
            </CardContainer>
        ):(<ResultContainer>
            <h1>End of Quiz</h1>
            <h2>Your final score is: {score}</h2>
            <h2>Total number of questions: {currentQIndex}</h2>
            </ResultContainer>)
        }

      </QuizContainer>
    );
  };

  Quiz.propTypes = {
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired
  };


  const QuizContainer = styled.div`
  padding: 20px;
`;

const CardContainer = styled.div`
  border: 1px solid #fff;
  border-radius: 10px;
  background-color:#4caf50;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Question = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #fff;
  border-radius: 5px;
`;

const OptionList = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: left;
`;

const OptionItem = styled.li`
  margin-bottom: 10px;
`;
const OptionCheckbox = styled.input`
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  background-color: #5ac26b;
  color: white;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  border: none;
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


export default Quiz;