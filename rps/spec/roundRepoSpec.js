import {expect} from 'chai';
import InMemoryRoundRepo from "../src/InMemoryRoundRepo";
import Round from "../src/Round";

describe('RoundRepo', () => {
  let repo;

  beforeEach(() => {
    repo = new InMemoryRoundRepo();
  });

  it('should be empty if no rounds have been saved', async () => {
    expect(await repo.isEmpty()).to.be.true;
  });

  it('should not be empty if rounds have been saved', async () => {
    repo.save(new Round());
    expect(await repo.isEmpty()).to.be.false;
  });

  it('should return all rounds that have been saved', async () => {
    await repo.save(new Round('ROCK', 'PAPER', 'p2'));
    await repo.save(new Round('PAPER', 'ROCK', 'p1'));

    expect(await repo.getAll()).to.eql([
      new Round('ROCK', 'PAPER', 'p2'),
      new Round('PAPER', 'ROCK', 'p1'),
    ])
  });
});