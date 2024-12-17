import { useEffect } from 'react';
import Result from './Result';
import Footer from './Footer';
import { useQuestion } from '../store/QuestionProvider';
import ReactLogo from '/react.svg';
import Questions from './Questions';

export default function ReactQuiz() {
  const { state, dispatch } = useQuestion();
  const { questions, status, index, answer,  secondsRemaining } = state;
  const question = questions[index]; // Get the current question

  // Timer Effect
  useEffect(() => {
    if (status === "active" && secondsRemaining > 0) {
      const timerId = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(timerId);
    } else if (secondsRemaining === 0) {
      dispatch({ type: "finished" }); // Automatically show results when time is up
    }
  }, [status, secondsRemaining]);

  const handleAnswerChange = (option) => {
    dispatch({ type: "new_answer", payload: option });
  };

  const isCorrectAnswer = (option) => option === question.correctOption;
  const isSelectedAnswer = (option) => answer === option;

  const handleDoneClick = () => {
    dispatch({ type: "finished" }); // Show results when "Done" is clicked
  };

  return (
    <section className="bg-gradient-to-r from-pink-500 to-rose-500 h-screen flex flex-col justify-center items-center">
      <img
        src={ReactLogo}
        alt="React Logo"
        className="animate-spin hover:animate-none transition-all  w-32 h-32 cursor-pointer"
      />

      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-white" >React Quiz App</h1>
        <p className="text-white text-xl">Welcome to The React Quiz App!</p>
      </div>

      <button
        popovertarget="quiz"
        className="bg-white text-rose-500 px-5 py-2 rounded-lg mt-5 font-bold hover:bg-rose-500 hover:text-white"
        onClick={() => dispatch({ type: "start" })}
      >
        Get Started
      </button>

      {status === "active" && (
        <div id="quiz" popover="true" className="rounded-md sm:w-6/12 md:w-7/12 pb-3 px-3 py-5">
          {/* if status is loading show loading otherwise show questions */} 
          {
            status === "loading" ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="h-3 w-3 bg-rose-500 rounded-full animate-bounce"></div>
                <div className="h-3 w-3 bg-rose-500 rounded-full animate-bounce"></div>
                <div className="h-3 w-3 bg-rose-500 rounded-full animate-bounce"></div>
              </div>
            ) : (
              <Questions {...{ question, handleAnswerChange, isCorrectAnswer, isSelectedAnswer, handleDoneClick }} />
            )
          }
         
        </div>
      )}

      {status === "finished" && (
        <div className='w-full bg-white sm:w-8/12 rounded-md py-20 absolute top-40 space-y-2'>
          <Result />
        </div>
      )}

      <Footer />
    </section>
  );
}
