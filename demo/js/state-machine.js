import { retrieveFromStorage, storeInStorage } from "./use-storage.js";
import { generateUniquePhrase, generateUUIDv4 } from "./generators.js";

export const State = {
  PHRASE_ISSUED: "PHRASE_ISSUED",
  QUESTIONS: "QUESTIONS",
  LIMIT_REACHED: "LIMIT_REACHED",
  SUBMIT_PHRASE: "SUBMIT_PHRASE",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  TRANSFER_PORTAL: "TRANSFER_PORTAL",
  DEMO_WALL: "DEMO_WALL",
};

const TRANSITIONS = {
  [State.PHRASE_ISSUED]: [State.QUESTIONS, State.SUBMIT_PHRASE],

  [State.QUESTIONS]: [
    State.QUESTIONS, // keep asking
    State.LIMIT_REACHED,
    State.SUBMIT_PHRASE,
  ],

  [State.LIMIT_REACHED]: [State.SUBMIT_PHRASE],

  [State.SUBMIT_PHRASE]: [State.SUCCESS, State.FAILURE],

  [State.FAILURE]: [State.TRANSFER_PORTAL],

  [State.TRANSFER_PORTAL]: [State.DEMO_WALL],

  [State.SUCCESS]: [State.DEMO_WALL],

  [State.DEMO_WALL]: [],
};

export const ROUTE_STATE_MAP = {
  [State.PHRASE_ISSUED]: "/page1.html",
  [State.QUESTIONS]: "/page2.html",
  [State.LIMIT_REACHED]: "/page9.html",
  [State.SUBMIT_PHRASE]: "/page3.html",
  [State.SUCCESS]: "/page4.html",
  [State.FAILURE]: "/page5.html",
  [State.TRANSFER_PORTAL]: "/page6.html",
  [State.DEMO_WALL]: "/page7.html",
};

export const UNIQUE_PHRASE_STORAGE_KEY = "uniquePhrase";
export const STATE_STORAGE_KEY = "state";
export const UUID_STORAGE_KEY = "UUID";
export const QUESTIONS_COUNT_KEY = "questions-count"

class stateMachineClass {
  currentState;
  uniquePhrase;
  UUID;
  questionsCount;

  constructor() {
    this.currentState = State.PHRASE_ISSUED;
    this.uniquePhrase = generateUniquePhrase();
    this.UUID = generateUUIDv4();
    this.questionsCount = 0

    this.restoreFromStorage();
    this.persistInStorage()

    this.validateCurrentRoute();
  }

  getState() {
    return this.currentState;
  }

  getUniquePhrase() {
    return this.uniquePhrase;
  }

  getUUID() {
    return this.UUID;
  }

  getQuestionsCount(){
    return this.questionsCount
  }
  
  increaseQuestionsCount(){
    const currentCount = this.questionsCount
    this.questionsCount = currentCount + 1
    this.persistInStorage()
  }

  canTransitionTo(nextState) {
    return TRANSITIONS[this.currentState].includes(nextState);
  }

  transitionTo(nextState) {
    if (!this.canTransitionTo(nextState)) {
      console.warn(
        `[State MACHINE] Transition not allowed: ${this.currentState} → ${nextState}`,
      );
      return false;
    }

    this.currentState = nextState;
    this.persistInStorage();

    window.location.href = ROUTE_STATE_MAP[nextState];
    return true;
  }

  persistInStorage() {
    storeInStorage(STATE_STORAGE_KEY, this.currentState);
    storeInStorage(UNIQUE_PHRASE_STORAGE_KEY, this.uniquePhrase);
    storeInStorage(UUID_STORAGE_KEY, this.UUID);
    storeInStorage(QUESTIONS_COUNT_KEY, this.questionsCount);
  }

  restoreFromStorage() {
    const state = retrieveFromStorage(STATE_STORAGE_KEY);
    const phrase = retrieveFromStorage(UNIQUE_PHRASE_STORAGE_KEY);
    const uuid = retrieveFromStorage(UUID_STORAGE_KEY);
    const questionsCount = retrieveFromStorage(QUESTIONS_COUNT_KEY)

    if (state && Object.values(State).includes(state)) {
      this.currentState = state;
    }

    if (typeof phrase === "string" && phrase.length > 0) {
      this.uniquePhrase = phrase;
    }

    if (typeof uuid === "string" && uuid.length > 0) {
      this.UUID = uuid;
    }

    if(typeof questionsCount === "string" && Number.isNaN(questionsCount) === false){
      this.questionsCount = parseInt(questionsCount)
    }
  }

  reset() {
    this.currentState = State.PHRASE_ISSUED;
    this.uniquePhrase = generateUniquePhrase();
    this.UUID = generateUUIDv4();
    this.questionsCount = 0
    this.persistInStorage();
  }

  validateCurrentRoute() {
    const expectedRoute = ROUTE_STATE_MAP[this.currentState];

    if (window.location.pathname !== expectedRoute) {
      window.location.replace(expectedRoute);
    }
  }
}

export const stateMachine = new stateMachineClass();
