import React, { createContext, useContext, useReducer } from 'react';
import QuizQuestion from '../data/react-quiz.json';

export const QuestionContext = createContext();

// Define SECS_PER_QUESTION constant
const SECS_PER_QUESTION = 10; // Set how many seconds each question will take

const initialState = {
    questions: QuizQuestion,
    status: "loading", // 'loading', 'error', 'ready', 'active', 'finished'
    index: 0,
    answer: null,
    points: 0,
    highScore: JSON.parse(localStorage.getItem("highScore")) || 0,
    secondsRemaining: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "start": {
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION, // Fix SECS_PER_QUESTION usage
            };
        }
        case "next_question": {
            return { ...state, answer: null, index: state.index + 1 };
        }
        case "new_answer": {
            const question = state.questions[state.index];

            // Find the index of the selected answer in the options array
            const selectedOptionIndex = question.options.indexOf(action.payload);

            return {
                ...state,
                answer: action.payload,
                points: selectedOptionIndex === question.correctOption // Compare indices
                    ? state.points + question.points // Add points if correct
                    : state.points, // No points if incorrect
            };
        }       
        case "finished":
            // Calculate the new score and update high score if necessary
            const newScore = state.points; // `points` holds the current score
            const storedHighScore = localStorage.getItem("highScore");

            if (newScore > (storedHighScore ? parseInt(storedHighScore, 10) : 0)) {
                localStorage.setItem("highScore", newScore); // Save new high score to localStorage
            }

            return {
                ...state,
                highScore: Math.max(newScore, storedHighScore ? parseInt(storedHighScore, 10) : 0),
                status: "finished",
            };
        case "tick": {
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status,
            };
        }
        case "failed": {
            return { ...state, status: "error" };
        }
        case "restart": {
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
                highScore: state.highScore,
            };
        }

        default:
            throw new Error(`Unknown action ${action.type}`);
    }
};

export default function QuestionProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <QuestionContext.Provider value={{ state, dispatch }}>
            {children}
        </QuestionContext.Provider>
    );
}

// Custom hook to use the context
export const useQuestion = () => {
    return useContext(QuestionContext);
};
