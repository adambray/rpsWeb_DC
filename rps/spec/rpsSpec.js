import {expect} from 'chai';
import {ObserverSpy} from "./observerSpy";
import {RPS, ROCK, PAPER, SCISSORS}  from "../src/RPS";

// interface RPSObserver {
//     p1Wins();
//     p2Wins();
//     tie();
//     invalid();
// }

describe('RPS', () => {
    let observer, rps;
    beforeEach(() => {
        observer = new ObserverSpy();
        rps = new RPS();
    });

    it('tells the observer that p1Wins when playing rock vs scissors', () => {
        rps.playRps(ROCK, SCISSORS, observer);

        expect(observer.p1WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that p2Wins when playing scissors vs rock', () => {
        rps.playRps(SCISSORS, ROCK, observer);

        expect(observer.p2WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that p1Wins when playing scissors vs paper', () => {
        rps.playRps(SCISSORS, PAPER, observer);

        expect(observer.p1WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that p2Wins when playing paper vs scissors', () => {
        rps.playRps(PAPER, SCISSORS, observer);

        expect(observer.p2WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that p1Wins when playing paper vs rock', () => {
        rps.playRps(PAPER, ROCK, observer);

        expect(observer.p1WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that p2Wins whe n playing rock vs paper', () => {
        rps.playRps(ROCK, PAPER, observer);

        expect(observer.p2WinsWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that there was a tie when playing scissors vs scissors', () => {
        rps.playRps(SCISSORS, SCISSORS, observer);

        expect(observer.tieWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });

    it('tells the observer that there was an invalid play when an invalid throw is given', () => {
        rps.playRps(SCISSORS, "SAILBOAT", observer);

        expect(observer.invalidWasCalled).to.be.true;
        expect(observer.numCalls).to.equal(1);
    });
});