function Intro(props) {
  return (
    <header className="intro">
      <h1 className="intro--title">Quizzical</h1>
      <p className="intro--subtitle">The best trivia game ever</p>
      <button className="start--quiz" onClick={props.handleRenderGame}>Start quiz</button>
    </header>
  )
}

export default Intro