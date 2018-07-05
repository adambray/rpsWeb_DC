export const ROCK = 'ROCK';
export const PAPER = 'PAPER';
export const SCISSORS = 'SCISSORS';

export class RPS {
    playRps(p1Throw, p2Throw, ui) {
        const rules = new Rules(p1Throw, p2Throw);

        if (rules.p1Invalid || rules.p2Invalid) {
            ui.invalid();
            return;
        }

        if (rules.tie) {
            ui.tie();
        } else if (rules.p1Wins) {
            ui.p1Wins();
        } else {
            ui.p2Wins();
        }
    }
}

class Rules {
    constructor(p1Throw, p2Throw) {
        this.p1Throw = p1Throw;
        this.p2Throw = p2Throw;
        this.validThrows = [ROCK, PAPER, SCISSORS];
    }

    get p1Invalid() {
        return !this.validThrows.includes(this.p1Throw);
    }

    get p2Invalid() {
        return !this.validThrows.includes(this.p2Throw);
    }

    get tie() {
        return this.p1Throw === this.p2Throw
    }

    get p1Wins() {
        return (
            this.p1Throw === ROCK && this.p2Throw === SCISSORS ||
            this.p1Throw === PAPER && this.p2Throw === ROCK ||
            this.p1Throw === SCISSORS && this.p2Throw === PAPER
        );
    }
}













