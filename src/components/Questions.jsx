// Desc: This file contains the Questions component which is used to display the questions and options to the user.

import { useQuestion } from "../store/QuestionProvider";

export default function Questions({ question, handleAnswerChange, isCorrectAnswer, isSelectedAnswer, handleDoneClick }) {
    const { state, dispatch } = useQuestion();
    const { questions, secondsRemaining, answer, index, points } = state;
    return (
        <>
            <button
                className="bg-rose-500 text-white px-2 float-right rounded-md font-semibold hover:bg-rose-700"
                onClick={() => dispatch({ type: "restart" })}
            >
                &times;
            </button>
            <div className="flex justify-between py-8">
                <div className="flex items-center">
                    <img src="/react.svg" alt="React Logo" className="size-8 animate-spin hover:animate-none transition-all cursor-pointer" />
                    <p className="font-bold text-lg  ">Quiz Application</p>
                </div>
                <p className="bg-rose-500 text-white p-1 rounded-md font-semibold select-none">
                    Time Left  :
                    <span className="bg-black text-white font-bold py-[2px] px-2 rounded-md">
                        {secondsRemaining}
                    </span>
                </p>
            </div>
            <progress value={index + 1} max={questions.length} className="w-full h-2 quizProgress" />

            <div className="flex justify-between">
                <p className="font-semibold text-lg">Question {index + 1} / {questions.length}</p>
                <p className="font-semibold">{points} / {questions.reduce((acc, question) => acc + question.points, 0)}</p>
            </div>

            <div className="flex flex-col space-y-3">
                <p className="text-lg font-semibold capitalize">
                    {index + 1}. {question?.question}
                </p>
                <div className="flex flex-col space-y-2">
                    {question?.options.map((option, i) => (
                        <div className="flex items-center space-x-3" key={i}>
                            <label
                                htmlFor={`option${i}`}
                                className={`px-3 py-1 font-bold w-full rounded-md border ${isSelectedAnswer(option)
                                    ? isCorrectAnswer(i)
                                        ? "border-green-500 bg-green-100"
                                        : "border-red-500 bg-red-100"
                                    : "border-gray-400 hover:bg-gray-100"
                                    } text-black flex justify-between cursor-pointer`}
                            >
                                {option}
                                <span>
                                    {
                                        isSelectedAnswer(option) &&
                                        (isCorrectAnswer(i) ? "✓" : "✕")
                                    }
                                </span>
                                <input
                                    type="radio"
                                    name="answer"
                                    id={`option${i}`}
                                    className="hidden"
                                    value={option}
                                    checked={isSelectedAnswer(option)}
                                    onChange={() => handleAnswerChange(option)}
                                    disabled={!!answer} // Disable if an answer is already selected
                                />
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end mt-3">
                {index + 1 === questions.length ? (
                    <button
                        className="bg-rose-500 text-white px-3 py-2 rounded-md font-semibold hover:bg-rose-700"
                        onClick={handleDoneClick} // Show results when done is clicked
                    >
                        Done
                    </button>
                ) : (
                    <button
                        className="bg-rose-500 text-white px-3 py-2 rounded-md font-semibold hover:bg-rose-700"
                        onClick={() => dispatch({ type: "next_question" })}
                    >
                        Next Question
                    </button>
                )}
            </div>
        </>

    )
}
