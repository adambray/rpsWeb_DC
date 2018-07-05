import React from 'react';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import * as ReactDOM from "react-dom";
import {RPSApp} from "../src/RPSApp";
import * as sinon from "sinon";

const expect = chai.expect;
chai.use(sinonChai);

describe('play form', function () {
  let domFixture;

  beforeEach(setupDOM);
  afterEach(teardownDOM);

  it('should display "Player 2 Wins!" to the user when the user clicks play and the usecase says p2 wins', () => {
    renderApp({
      playRps: (p1, p2, observer) => observer.p2Wins()
    });

    expectPageToNotContain("Player 2 Wins!");
    play();
    expectPageToContain("Player 2 Wins!");
  });

  it('should display "Player 1 Wins!" to the user when the user clicks play and the usecase says p2 wins', () => {
    renderApp({
      playRps: (p1, p2, observer) => observer.p1Wins()
    });

    expectPageToNotContain("Player 1 Wins!");
    play();
    expect(document.body.innerText).to.contain("Player 1 Wins!");
  });

  it('should display "Tie!" to the user when the user clicks play and the usecase says tie', () => {
    renderApp({
      playRps: (p1, p2, observer) => observer.tie()
    });

    expectPageToNotContain("Tie!");
    play();
    expectPageToContain("Tie!");
  });

  it('should display "Invalid Input" to the user when the user clicks play and the usecase says invalid', () => {
    renderApp({
      playRps: (p1, p2, observer) => observer.invalid()
    });

    expectPageToNotContain("Invalid Input");
    play();
    expectPageToContain("Invalid Input");
  });

  it('should pass the inputs to the rps usecase', function () {
    const playSpy = {playRps: sinon.spy()};
    renderApp(playSpy);

    play("ROCK", "PAPER");

    expect(playSpy.playRps).to.have.been.calledWith("ROCK", "PAPER");
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
