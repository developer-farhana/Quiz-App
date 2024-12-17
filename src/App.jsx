import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

// import ReactQuiz from "./components/ReactQuiz";
const ReactQuiz = lazy(() => import("./components/ReactQuiz"));


export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ReactQuiz />
    </Suspense>
  )
}
