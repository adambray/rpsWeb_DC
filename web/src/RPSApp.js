import React from 'react';

export class RPSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultText: "",
    };

    this.updateThrow = this.updateThrow.bind(this);
  }

  playGame() {
    this.props.usecases.playRps(this.state.p1Throw, this.state.p2Throw, this);
  }

  updateThrow(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
      <h1>Make decisions here:</h1>
        <input id="p1Throw" name="p1Throw" value={this.state.p1Throw} onChange={this.updateThrow}/>
        <input id="p2Throw" name="p2Throw" value={this.state.p2Throw} onChange={this.updateThrow}/>
        <button id="playButton" onClick={() => this.playGame()}>Play!</button>
        <span>{this.state.resultText}</span>
      </div>
    );
  }

  p1Wins() {
    this.setState({resultText: "Player 1 Wins!",});
  }

  p2Wins() {
    this.setState({resultText: "Player 2 Wins!"});
  }

  tie() {
    this.setState({resultText: "Tie!"});
  }

  invalid() {
    this.setState({resultText: "Invalid Input"});
  }
}