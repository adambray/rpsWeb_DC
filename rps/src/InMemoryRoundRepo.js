class InMemoryRoundRepo {

  constructor() {
    this.rounds = [];
  }

  save(round) {
    this.rounds.push(round);
  }

  getAll() {
    return this.rounds;
  }

  get empty() {
    return this.rounds.length === 0;
  }
}

export default InMemoryRoundRepo;