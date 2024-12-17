import Result from "./Result";
import { useQuestion } from "../store/QuestionProvider";

export default function Modal() {
    const { state, dispatch } = useQuestion();
    const { questions, status, index, answer, points, highScore, secondsRemaining } = state;
  
    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'error') return <p>Error loading quiz data.</p>;
    if (status === 'finished') return <Result highScore={highScore} />;
  
    const question = questions[index];
  
    return (
      <div id='quiz' popover="true" className='rounded-md sm:w-8/12 pb-3 px-3'>
        <div className="flex justify-between">
          <p className='font-bold text-lg'> Quiz Application </p>
          <p className='bg-rose-500 text-white p-1 rounded-md font-semibold select-none '>
            Time Left <span className='bg-black text-white font-bold py-[2px] px-2 rounded-md'>{secondsRemaining}</span>
          </p>
        </div>
        <p className='text-md text-center text-gray-500'> Please select the correct answer from the options below. </p>
        <hr className='my-2 border-4 border-rose-500 w-40 rounded-md' />
  
        <div className="flex justify-between">
          <p className='font-semibold text-lg'> Question {index + 1} / {questions.length} </p>
          <p className=' font-semibold'> {points} / 200 </p>
        </div>
  
        <div className="flex flex-col space-y-3">
          <p className='text-lg font-semibold capitalize'>
            {index + 1}. {question?.questionText}
          </p>
          <div className="flex flex-col space-y-2">
            {question?.options.map((option, i) => (
              <div className="flex items-center space-x-3" key={i}>
                <label
                  htmlFor={`option${i}`}
                  className="px-3 py-1 font-bold w-full rounded-md border border-green-400 text-black flex justify-between cursor-pointer hover:bg-green-100"
                >
                  {option}
                  <input
                    type="radio"
                    name="answer"
                    id={`option${i}`}
                    className="hidden"
                    value={option}
                    checked={answer === option}
                    onChange={() => dispatch({ type: "new_answer", payload: option })}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
  
        <div className="flex justify-end mt-3">
          <button
            className='bg-rose-500 text-white px-3 py-2 rounded-md font-semibold hover:bg-rose-700'
            onClick={() => dispatch({ type: "next_question" })}
          >
            Next Question
          </button>
        </div>
  
        <Result highScore={highScore} />
      </div>
    );
  }
  