// import './index.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Quiz = ({selection}) => {

    const [quiz, setQuiz] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [category, difficulty] = selection;

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
                // console.log(quiz[1].question)
            }
            // console.log(typeof data);

        })
        .catch(error => {
            console.error(error);          
        });
    }
    }, [category, difficulty, selection.length]);

    const handleNextQuestion = () => {
        setCurrentQIndex((prevIndex)=>prevIndex+1);
    }

    // const Options = (props) => {
    //         props.options.forEach(([key, value]) => {
                
    //           })
    // }


    return (
      <div>
        {/* {quiz.length&&quiz[0]?<p>True and also {quiz[0].id}</p>:<p>No values</p>} */}
        {quiz.length?(
            <div>
                <p>{quiz[currentQIndex].id}</p>
                <p>{quiz[currentQIndex].question}</p>
                <ul>{quiz[currentQIndex].options.map((option, index) => (
                    <li key={option[0] }>{index}{option[1]}</li>
                ))}</ul>
                {/* <p>{}</p> */}
                <button onClick={handleNextQuestion}>Next</button>
            </div>
        // <p>
        //     {quiz.map((question, index)=> (
        //     <div key={index}>
        //             <p>{question.id}</p>
        //             <p>{question.question}</p>
        //     </div>
        // ))}</p>
        )
        :(<p>No values</p>)
        }

      </div>
    );
  };

  Quiz.propTypes = {
    selection: PropTypes.array.isRequired,
    // selection: PropTypes.array.isRequired;
  };

export default Quiz;