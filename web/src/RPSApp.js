import React from 'react';

export class RPSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultText: "",
    };

    this.resultObserver = new ResultObserver(this.setState.bind(this));
  }

  playGame() {
    this.props.usecases.playRps(null, null, this.resultObserver);
  }

  render() {
    return (
      <div>
      <h1>Make decisions here:</h1>
        <button id="playButton" onClick={() => this.playGame()}>Play!</button>
        <span>{this.state.resultText}</span>
      </div>
    );
  }
}

class ResultObserver {

  constructor(setStateFn) {
    this.setStateFn = setStateFn;
  }

  p1Wins() {
    this.setStateFn({resultText: "Player 1 Wins!"});
  }

  p2Wins() {
    this.setStateFn({resultText: "Player 2 Wins!"});
  }

  tie() {
    this.setStateFn({resultText: "Tie!"});
  }

  invalid() {
    this.setStateFn({resultText: "Invalid Input"});
  }
}