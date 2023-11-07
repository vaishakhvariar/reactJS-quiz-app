// import './index.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Quiz = ({selection}) => {

    const [quiz, setQuiz] = useState([]);
    const [category, difficulty] = selection;


    useEffect(() => {
        const apiKey = 'PaM9NATVEd1imVikLrcE3UyGPvDFxYdA6Sx2Vug9';
        const apiUrl = 'https://quizapi.io/api/v1/questions';

        fetch(`${apiUrl}?apiKey=${apiKey}&difficulty=${difficulty}&category=${category}`)
        .then((response) => response.json())
        .then((data)=>{
            if(data){
                setQuiz(data);
                console.log(data)
            }
            // console.log(typeof data);

        })
        .catch(error => {
            console.error(error);          
        });
    }, [category,difficulty]);

    return (
      <div>
        <p>{quiz[0].id}</p>
      </div>
    );
  };

  Quiz.propTypes = {
    selection: PropTypes.array.isRequired
  };

export default Quiz;