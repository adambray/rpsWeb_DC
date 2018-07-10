class InMemoryRoundRepo {

  constructor(delay) {
    this.rounds = [];
    this.delay = delay ? 0 :delay
  }

  async save(round) {
    this.rounds.push(round);
    return new Promise(resolve => {
      setTimeout(() => resolve(), this.delay);
    });
  }

  async getAll() {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.rounds), this.delay)
    });
  }

   async isEmpty() {
    return Promise.resolve(this.rounds.length === 0);
  }
}

export default InMemoryRoundRepo;