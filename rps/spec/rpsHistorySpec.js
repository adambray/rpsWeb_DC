import chai from 'chai';
import sinonChai from 'sinon-chai';
import * as sinon from "sinon";

import {RPS, ROCK, PAPER, SCISSORS} from "../src/RPS";
import Round from "../src/Round";
import InMemoryRoundRepo from "../src/InMemoryRoundRepo";
import {UiObserverSpy} from "./observerSpy";

const expect = chai.expect;
chai.use(sinonChai);

describe('RPS History', () => {
  let uiObserver, historyObserver, rps;
  beforeEach(() => {
    uiObserver = new UiObserverSpy();

    historyObserver = {
      rounds: sinon.spy(),
      noRounds: sinon.spy(),
    };

    rps = new RPS(new InMemoryRoundRepo());
  });

  it('tells the history observer that there are no rounds if no rounds have been played', () => {
    rps.history(historyObserver);

    expect(historyObserver.noRounds).to.have.been.called;
  });

  it('tells the history observer what rounds are in the history if rounds have been played', () => {
    rps.playRound("ROCK", "PAPER", uiObserver);
    rps.playRound("ROCK", "SCISSORS", uiObserver);
    rps.playRound("ROCK", "ROCK", uiObserver);
    rps.playRound("ROCK", "SAILBOAT", uiObserver);

    rps.history(historyObserver);

    const expectedRounds = [
      new Round("ROCK", "PAPER", 'p2'),
      new Round("ROCK", "SCISSORS", 'p1'),
      new Round("ROCK", "ROCK", 'tie'),
      new Round("ROCK", "SAILBOAT", 'invalid'),
    ];

    expect(historyObserver.rounds).calledWith(expectedRounds);
  });
});