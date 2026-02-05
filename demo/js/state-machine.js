export const STATES = {
  PHRASE_ISSUED: "PHRASE_ISSUED",
  QUESTIONS: "QUESTIONS",
  LIMIT_REACHED: "LIMIT_REACHED",
  SUBMIT_PHRASE: "SUBMIT_PHRASE",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  TRANSFER_PORTAL: "TRANSFER_PORTAL",
  DEMO_WALL: "DEMO_WALL",
}


const TRANSITIONS = {

  [STATES.PHRASE_ISSUED]: [
    STATES.QUESTIONS,
    STATES.SUBMIT_PHRASE,
  ],

  [STATES.QUESTIONS]: [
    STATES.QUESTIONS,       // keep asking
    STATES.LIMIT_REACHED,
    STATES.SUBMIT_PHRASE,
  ],

  [STATES.LIMIT_REACHED]: [
    STATES.SUBMIT_PHRASE,
  ],

  [STATES.SUBMIT_PHRASE]: [
    STATES.SUCCESS,
    STATES.FAILURE,
  ],

  [STATES.FAILURE]: [
    STATES.TRANSFER_PORTAL,
  ],

  [STATES.TRANSFER_PORTAL]: [
    STATES.DEMO_WALL,
  ],

  [STATES.SUCCESS]: [
    STATES.DEMO_WALL,
  ],

  [STATES.DEMO_WALL]: [],
};

class stateMachine {
  currentSTATES;

  constructor(initialSTATES = STATES.PHRASE_ISSUED) {
    this.currentSTATES = initialSTATES;
  }

  getSTATES() {
    return this.currentSTATES;
  }

  canTransitionTo(nextSTATES) {
    return TRANSITIONS[this.currentSTATES].includes(nextSTATES);
  }

  transitionTo(nextSTATES) {
    if (!this.canTransitionTo(nextSTATES)) {
      console.warn(
        `[STATES MACHINE] Transición no permitida: ${this.currentSTATES} → ${nextSTATES}`
      );
      return false;
    }

    this.currentSTATES = nextSTATES;
    this.persistSTATES();
    return true;
  }

  persistSTATES() {
    sessionStorage.setItem("nuvo_STATES", this.currentSTATES);
  }

  restoreSTATES() {
    const saved = sessionStorage.getItem("nuvo_STATES");
    if (saved && Object.values(STATES).includes(saved)) {
      this.currentSTATES = saved;
    }
  }

  reset() {
    this.currentSTATES = STATES.PHRASE_ISSUED;
    this.persistSTATES();
  }
}

export const stateMachine = new stateMachine();

stateMachine.restoreSTATES();
