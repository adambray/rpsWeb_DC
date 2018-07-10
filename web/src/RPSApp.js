import React from 'react';

export class RPSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultText: "",
      p1Throw: "",
      p2Throw: "",
    };

    this.updateThrow = this.updateThrow.bind(this);
  }

  componentDidMount() {
    this.props.usecases.history(this);
  }

  playGame() {
    this.props.usecases.playRound(this.state.p1Throw, this.state.p2Throw, this);
    this.props.usecases.history(this);
  }

  updateThrow(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  renderRound(round, index) {
    const results = {
      'p1': 'Player 1 Wins',
      'p2': 'Player 2 Wins',
      'tie': 'Tie',
      'invalid': 'Invalid',
    };

    return <li key={index}>Player 1: {round.p1}, Player 2: {round.p2}, Result: {results[round.result]}</li>
  }

  renderRoundHistory() {
    if (this.state.rounds) {
      return (
        <ul>
          {this.state.rounds.map(this.renderRound)}
        </ul>
      );
    } else {
      return 'No rounds'
    }
  }

  render() {
    return (
      <div>
        <h1>Make decisions here:</h1>
        <input id="p1Throw" name="p1Throw" value={this.state.p1Throw} onChange={this.updateThrow}/>
        <input id="p2Throw" name="p2Throw" value={this.state.p2Throw} onChange={this.updateThrow}/>
        <button id="playButton" onClick={() => this.playGame()}>Play!</button>
        <span>{this.state.resultText}</span>
        <h2>History</h2>
        {this.renderRoundHistory()}
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

  noRounds() {
    this.setState({rounds: null});
  }

  rounds(rounds) {
    this.setState({rounds: rounds});
  }
}