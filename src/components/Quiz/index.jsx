// import './index.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const Quiz = ({selection}) => {

    const [quiz, setQuiz] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [category, difficulty] = selection;
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
        if(selection.length){

        fetch(`${apiUrl}?apiKey=${apiKey}&difficulty=${difficulty}&category=${category}`)
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
    }, [category, difficulty, selection.length]);

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
      <div>
        {quiz.length?(
            <div>
                <p>{quiz[currentQIndex].id}</p>
                <p>{quiz[currentQIndex].question}</p>
                <ul>{quiz[currentQIndex].options.filter(item => item[1]).map((option, index) => (
                    <li key={option[0] }>
                        <input 
                        type='checkbox' 
                        id={option[0]} 
                        value={option[1]}
                        checked={selectedOptions.includes(option[0])}
                        onChange={() => {
                            handleOptionChange(option[0]); 
                        }} />
                        <label htmlFor={option[0]}>{index+1} {option[1]}</label>
                    </li>
                ))}</ul>
                <button onClick={handleSubmitButton}>Submit</button>
                <VerifyAnswer />
                <button disabled={!showVerifyAnswer} onClick={handleNextQuestion}>Next</button>
            </div>
        )
        :(<p>No values</p>)
        }

      </div>
    );
  };

  Quiz.propTypes = {
    selection: PropTypes.array.isRequired,

  };



export default Quiz;