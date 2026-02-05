export enum State {
  PHRASE_ISSUED = "PHRASE_ISSUED",
  QUESTIONS = "QUESTIONS",
  LIMIT_REACHED = "LIMIT_REACHED",
  SUBMIT_PHRASE = "SUBMIT_PHRASE",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  TRANSFER_PORTAL = "TRANSFER_PORTAL",
  DEMO_WALL = "DEMO_WALL",
}

type TransitionMap = {
  [key in State]: State[];
};

const TRANSITIONS: TransitionMap = {

  [State.PHRASE_ISSUED]: [
    State.QUESTIONS,
    State.SUBMIT_PHRASE,
  ],

  [State.QUESTIONS]: [
    State.QUESTIONS,       // keep asking
    State.LIMIT_REACHED,
    State.SUBMIT_PHRASE,
  ],

  [State.LIMIT_REACHED]: [
    State.SUBMIT_PHRASE,
  ],

  [State.SUBMIT_PHRASE]: [
    State.SUCCESS,
    State.FAILURE,
  ],

  [State.FAILURE]: [
    State.TRANSFER_PORTAL,
  ],

  [State.TRANSFER_PORTAL]: [
    State.DEMO_WALL,
  ],

  [State.SUCCESS]: [
    State.DEMO_WALL,
  ],

  [State.DEMO_WALL]: [],
};

class StateMachine {
  private currentState: State;

  constructor(initialState: State = State.PHRASE_ISSUED) {
    this.currentState = initialState;
  }

  getState(): State {
    return this.currentState;
  }

  canTransitionTo(nextState: State): boolean {
    return TRANSITIONS[this.currentState].includes(nextState);
  }

  transitionTo(nextState: State): boolean {
    if (!this.canTransitionTo(nextState)) {
      console.warn(
        `[STATE MACHINE] Transición no permitida: ${this.currentState} → ${nextState}`
      );
      return false;
    }

    this.currentState = nextState;
    this.persistState();
    return true;
  }

  persistState(): void {
    sessionStorage.setItem("nuvo_state", this.currentState);
  }

  restoreState(): void {
    const saved = sessionStorage.getItem("nuvo_state") as State | null;
    if (saved && Object.values(State).includes(saved)) {
      this.currentState = saved;
    }
  }

  reset(): void {
    this.currentState = State.PHRASE_ISSUED;
    this.persistState();
  }
}

export const stateMachine = new StateMachine();

stateMachine.restoreState();
