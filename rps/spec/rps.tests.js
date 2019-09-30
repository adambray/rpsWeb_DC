import chai from 'chai';
import sinonChai from 'sinon-chai';

const expect = chai.expect;
chai.use(sinonChai);

describe('play form', function () {
    it('can run a test', () => {
        expect(true).to.equal(true);
    })
});