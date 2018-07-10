import {expect} from 'chai';
import InMemoryRoundRepo from "../src/InMemoryRoundRepo";
import Round from "../src/Round";

describe('RoundRepo', () => {
  let repo;

  beforeEach(() => {
    repo = new InMemoryRoundRepo();
  });

  it('should be empty if no rounds have been saved', () => {
    expect(repo.empty).to.be.true;
  });

  it('should not be empty if rounds have been saved', () => {
    repo.save(new Round());
    expect(repo.empty).to.be.false;
  });

  it('should return all rounds that have been saved', () => {
    repo.save(new Round('ROCK', 'PAPER', 'p2'));
    repo.save(new Round('PAPER', 'ROCK', 'p1'));

    expect(repo.getAll()).to.eql([
      new Round('ROCK', 'PAPER', 'p2'),
      new Round('PAPER', 'ROCK', 'p1'),
    ])
  });
});