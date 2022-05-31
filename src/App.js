import Question from "./components/Question"
import Intro from "./components/Intro"
import {useState, useEffect} from "react"

function App() {

  const [renderGame, setRenderGame] = useState(false)
  const [game, setGame] = useState(false)
  const [newGame, setNewGame] = useState(false)
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [storage, setStorage] = useState([])

  useEffect(() => {
    async function fetchTriviaApi() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      const data = await res.json()
      /* TRYING TO REPLACE SPECIAL CHARS.. 
      data.results.map(obj => obj.question.replace("&#039;", "'")) */
      setQuestions(data.results)
    }
    fetchTriviaApi()
  }, [newGame])

  useEffect(() => {
    setScore(storage.filter(obj => obj.userAnswer === obj.correctAnswer).length)
  }, [storage])

  function handleRenderGame() {
    setRenderGame(true)
  }

  function handleGame() {
    setGame(prevNewGame => !prevNewGame)
  }

  function resetGame() {
    handleGame()
    setNewGame(prevGame => !prevGame)
    setStorage([])
  }

  function handleClick(questionId, userAnswer, correctAnswer) {
    console.log(`Question ${questionId}, answer by the user: ${userAnswer}. CORRECT answer: ${correctAnswer}`)
    setStorage(prevStorage => {
      for(let i = 0; i < prevStorage.length; i++) {
        const obj = prevStorage[i]
        if (obj.questionId === questionId) {
          prevStorage.splice(i, 1)
          break
        }
      }
        return [
          ...prevStorage,
          {
            questionId: questionId,
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            isSelected: true
          }
        ].sort((a, b) => a.questionId - b.questionId)
    })
  }

  const questionsElements = questions.map((question, index) => {
    return (<Question 
      key={index}
      id={index}
      question={question.question}
      correct_answer={question.correct_answer}
      incorrect_answers={question.incorrect_answers}
      all_answers={question.incorrect_answers.concat(question.correct_answer).sort()}
      handleClick={(answer) => handleClick(index, answer, question.correct_answer)}
      game={game}
      storage={storage}
    />)
  })

  return (
    <main>
      {!renderGame && <Intro handleRenderGame={handleRenderGame} />}
      {renderGame &&
        <div className="quiz-page">
          <h2 className="quiz-title">New game</h2>
          {questionsElements}
          {!game && <button className="check-button" onClick={storage.length === 5 ? handleGame : null}>Check answers</button>}
          {game && 
            <div className="quiz-result">
              <p className="quiz-score">Your score is {score} / 5</p>
              <button className="reset-button" onClick={resetGame}>New Game</button>
            </div>
          }
        </div>
      }
    </main>
  )
}

export default App