import React, {useState} from 'react';

const RPSApp = (props) => {
  const [resultText, setResultText] = useState("");
  const resultObserver = new ResultObserver(setResultText);

  return (
      <div>
        <h1>Make decisions here:</h1>
        <button onClick={() => {playGame(props.usecases, resultObserver)} }>Play!</button>
        <span>{resultText}</span>
      </div>
  );
};

export default RPSApp;

function playGame(usecases, resultObserver) {
  usecases.playRps(null, null, resultObserver);
}

class ResultObserver {

  constructor(setResultText) {
    this.setResultText = setResultText;
  }

  p1Wins() {
    this.setResultText("Player 1 Wins!",);
  }

  p2Wins() {
    this.setResultText("Player 2 Wins!");
  }

  tie() {
    this.setResultText("Tie!");
  }

  invalid() {
    this.setResultText("Invalid Input");
  }
}