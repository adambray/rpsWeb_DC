import React from 'react';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import * as ReactDOM from "react-dom";
import {RPSApp} from "../src/RPSApp";
import * as sinon from "sinon";
import Round from "../../rps/src/Round";
import InMemoryRoundRepo from "../../rps/src/InMemoryRoundRepo";
import {RPS} from "rps";

const expect = chai.expect;
chai.use(sinonChai);

describe('play form', function () {
  let domFixture;

  beforeEach(setupDOM);
  afterEach(teardownDOM);

  describe('playing rounds', () => {
    let useCaseStub;

    beforeEach(() => {
      useCaseStub = {
        history: () => {
        }
      }
    });

    it('should display "Player 2 Wins!" to the user when the user clicks play and the usecase says p2 wins', () => {
      useCaseStub.playRound = (p1, p2, observer) => observer.p2Wins();
      renderApp(useCaseStub);

      expectPageToNotContain("Player 2 Wins!");
      play();
      expectPageToContain("Player 2 Wins!");
    });

    it('should display "Player 1 Wins!" to the user when the user clicks play and the usecase says p2 wins', () => {
      useCaseStub.playRound = (p1, p2, observer) => observer.p1Wins();
      renderApp(useCaseStub);

      expectPageToNotContain("Player 1 Wins!");
      play();
      expect(document.body.innerText).to.contain("Player 1 Wins!");
    });

    it('should display "Tie!" to the user when the user clicks play and the usecase says tie', () => {
      useCaseStub.playRound = (p1, p2, observer) => observer.tie();
      renderApp(useCaseStub);

      expectPageToNotContain("Tie!");
      play();
      expectPageToContain("Tie!");
    });

    it('should display "Invalid Input" to the user when the user clicks play and the usecase says invalid', () => {
      useCaseStub.playRound = (p1, p2, observer) => observer.invalid();
      renderApp(useCaseStub);

      expectPageToNotContain("Invalid Input");
      play();
      expectPageToContain("Invalid Input");
    });

    it('should pass the inputs to the rps usecase', function () {
      const useCaseSpy = {
        playRound: sinon.spy(),
        history: sinon.spy(),
      };

      renderApp(useCaseSpy);

      play("ROCK", "PAPER");

      expect(useCaseSpy.playRound).to.have.been.calledWith("ROCK", "PAPER");
    });
  });

  describe('showing history', () => {
    it('shows no rounds when history says no rounds are in the history', () => {
      renderApp({
        playRound: sinon.spy(),
          history: (historyObserver) => { historyObserver.noRounds()}
      });

      expectPageToContain("No rounds");
    });

    it('shows history info when history says rounds have been played', () => {
      renderApp({
        playRound: sinon.spy(),
        history: (historyObserver) => { historyObserver.rounds([
          new Round("ROCK", "PAPER", "p2"),
          new Round("ROCK", "SAILBOAT", "invalid"),
        ])}
      });

      expectPageToContain("Player 1: ROCK, Player 2: PAPER, Result: Player 2 Wins");
      expectPageToContain("Player 1: ROCK, Player 2: SAILBOAT, Result: Invalid");
    });

    it('asks for history after a round result has been given', (done) => {
      renderApp(new RPS(new InMemoryRoundRepo()));

      expectPageToNotContain("Player 1:");

      play("ROCK", "PAPER");

      setTimeout(() => {
        expectPageToContain("Player 1: ROCK, Player 2: PAPER, Result: Player 2 Wins");
        done();
      }, 50);
    });
  });

  function play(p1, p2) {
    setInputValue("p1Throw", p1);
    setInputValue("p2Throw", p2);
    document.querySelector('#playButton').click();
  }

  function setInputValue(id, value) {
    const input = document.getElementById(id);
    const lastValue = input.value;

    input.value = value;

    // react 16 hack
    let tracker = input._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }

    input.dispatchEvent(new Event('input', {'bubbles': true, 'cancelable': true}));
  }

  function expectPageToNotContain(text) {
    expect(document.body.innerText).to.not.contain(text);
  }

  function expectPageToContain(text) {
    expect(document.body.innerText).to.contain(text);
  }

  function renderApp(rpsUseCase) {
    ReactDOM.render(<RPSApp usecases={rpsUseCase}/>, domFixture);
  }

  function setupDOM() {
    domFixture = document.createElement('div');
    document.querySelector('body').appendChild(domFixture);
  }

  function teardownDOM() {
    domFixture.remove();
  }
});
