function Question(props) {
const answersElements = props.all_answers.map((answer, index) => {
  return (<div
    key={index}
    className="answer"
    style={
      {backgroundColor: 
        (answer === props.correct_answer && props.game) ? 
          "green" : 
        (props.game && answer === props.storage[props.id].userAnswer) ? 
          "red": 
        (props.storage.map(obj => obj.userAnswer).includes(answer)) ?
          "lightblue" :
          ""}}
    onClick={() => props.handleClick(answer)}
  >
    {answer}
  </div>)
})

  return (
    <section className="questions">
      <h3>{props.question}</h3>
      <div className="answers-container">{answersElements}</div>
      <p></p>
    </section>
  )
}

export default Question