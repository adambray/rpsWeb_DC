import Round from "./Round";

export const ROCK = 'ROCK';
export const PAPER = 'PAPER';
export const SCISSORS = 'SCISSORS';

export class RPS {
  constructor(repo) {
    this.repo = repo;
  }

  async playRound(p1Throw, p2Throw, ui) {
    const rules = new Rules(p1Throw, p2Throw);

    if (rules.p1Invalid || rules.p2Invalid) {
      ui.invalid();
      await this.recordResult(p1Throw, p2Throw, 'invalid');
      return;
    }

    if (rules.tie) {
      ui.tie();
      await this.recordResult(p1Throw, p2Throw, 'tie');
    } else if (rules.p1Wins) {
      ui.p1Wins();
      await this.recordResult(p1Throw, p2Throw, 'p1');
    } else {
      ui.p2Wins();
      await this.recordResult(p1Throw, p2Throw, 'p2');
    }
  }

  async history(observer) {
    if (await this.repo.isEmpty()) {
      observer.noRounds();
    } else {
      observer.rounds(await this.repo.getAll());
    }
  }

  async recordResult(p1Throw, p2Throw, result) {
    await this.repo.save(new Round(p1Throw, p2Throw, result));
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













