export class UiObserverSpy {
    constructor() {
        this.p1WinsWasCalled = false;
        this.p2WinsWasCalled = false;
        this.tieWasCalled = false;
        this.invalidWasCalled = false;
        this.numCalls = 0;
    }

    p1Wins() {
      this.p1WinsWasCalled = true;
      this.numCalls++;
    };

    p2Wins() {
      this.p2WinsWasCalled = true;
      this.numCalls++;
    };

    tie() {
      this.tieWasCalled = true;
      this.numCalls++;
    };

    invalid() {
      this.invalidWasCalled = true;
      this.numCalls++;
    };
}