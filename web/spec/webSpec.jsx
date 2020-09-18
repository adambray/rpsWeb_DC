import React from 'react';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import * as ReactDOM from "react-dom";
import RPSApp from "../src/RPSAppFunctional";

const expect = chai.expect;
chai.use(sinonChai);

describe('play form', function () {
  let domFixture;

  beforeEach(setupDOM);
  afterEach(teardownDOM);

  it('should display "Player 2 Wins!" to the user when the user clicks play and the usecase says p2 wins', () => {
    renderApp({
      playRps: (p1, p2, observer) => observer.p2Wins(),
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
    expectPageToContain("Player 1 Wins!");
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

  it('should pass the correct user input to the playRps method', () => {

  });

  function play(p1, p2) {
    // fill in inputs
    document.querySelector('button').click();
  }

  function setInputValue(elementId, value) {
    const input = document.getElementById(elementId);
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
