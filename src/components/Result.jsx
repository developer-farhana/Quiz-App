import React from 'react'
import { useQuestion } from '../store/QuestionProvider';

export default function Result() {
    const { state, dispatch } = useQuestion();
    const { questions, highScore, points } = state;
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-2">
            <p className='text-rose-500 text-4xl font-bold'> Congratulations! </p>
            <p className='text-rose-500 text-2xl font-semibold'> You have successfully completed the quiz. </p>
            <p className='text-rose-500 text-xl font-semibold'>
                Your  
                {/* when I click 2nd time then show previous otherwise blank */} 
                {highScore === points ? ' new ' : ' High '}
                 Score: {highScore}
            </p>
            <p className='text-rose-500 text-xl font-semibold'> You have scored {points} out of {questions.reduce((acc, question) => acc + question.points, 0)}. </p>
            <button onClick={() => dispatch({ type: 'restart' })} popovertarget="result" className='bg-rose-500 text-white font-bold px-3 py-1 rounded-md'> Try Again </button>

        </div>
    )
}
