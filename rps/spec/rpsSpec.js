import {expect} from 'chai';
import {UiObserverSpy} from "./observerSpy";
import {RPS, ROCK, PAPER, SCISSORS}  from "../src/RPS";
import InMemoryRoundRepo from "../src/InMemoryRoundRepo";


describe('RPS', () => {
    let observer, rps;
    beforeEach(() => {
        observer = new UiObserverSpy();
        rps = new RPS(new InMemoryRoundRepo());
    });

    it('tells the observer that p1Wins when playing rock vs scissors', () => {
        rps.playRound(ROCK, SCISSORS, observer);

        expect(observer.p1WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that p2Wins when playing scissors vs rock', () => {
        rps.playRound(SCISSORS, ROCK, observer);

        expect(observer.p2WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that p1Wins when playing scissors vs paper', () => {
        rps.playRound(SCISSORS, PAPER, observer);

        expect(observer.p1WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that p2Wins when playing paper vs scissors', () => {
        rps.playRound(PAPER, SCISSORS, observer);

        expect(observer.p2WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that p1Wins when playing paper vs rock', () => {
        rps.playRound(PAPER, ROCK, observer);

        expect(observer.p1WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that p2Wins whe n playing rock vs paper', () => {
        rps.playRound(ROCK, PAPER, observer);

        expect(observer.p2WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that there was a tie when playing scissors vs scissors', () => {
        rps.playRound(SCISSORS, SCISSORS, observer);

        expect(observer.tieWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that there was an invalid play when an invalid throw is given', () => {
        rps.playRound(SCISSORS, "SAILBOAT", observer);

        expect(observer.invalidWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });
});