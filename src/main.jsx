import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import QuestionProvider from './store/QuestionProvider'



ReactDOM.createRoot(document.getElementById('app')).render(
  <>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </>
)
