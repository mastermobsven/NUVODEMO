import { retrieveFromStorage, storeInStorage } from "./use-storage.js";
import { generateUniquePhrase, generateUUIDv4 } from "./generators.js";
import {
  State,
  TRANSITIONS,
  ROUTE_STATE_MAP,
  STATE_STORAGE_KEY,
  UNIQUE_PHRASE_STORAGE_KEY,
  PHRASE_COOLDOWN_TIMESTAMP,
  QUESTIONS_COUNT_KEY,
  UUID_STORAGE_KEY,
} from "./constants.js";

class stateMachineClass {
  currentState;
  uniquePhrase;
  phraseCooldownTimestamp;
  UUID;
  questionsCount;

  constructor({
    currentState = State.PHRASE_ISSUED,
    uniquePhrase = generateUniquePhrase(),
    UUID = generateUUIDv4(),
    questionsCount = 0,
    phraseCooldownTimestamp = null,
    skipInitialRestoreFromStorage = false
  }) {
    this.currentState = currentState;
    this.uniquePhrase = uniquePhrase;
    this.UUID = UUID;
    this.questionsCount = questionsCount;
    this.phraseCooldownTimestamp = phraseCooldownTimestamp;

    if(skipInitialRestoreFromStorage===false){
      this.restoreFromStorage();
    }
    this.persistInStorage();

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

  getQuestionsCount() {
    return this.questionsCount;
  }

  increaseQuestionsCount() {
    const currentCount = this.questionsCount;
    this.questionsCount = currentCount + 1;
    this.persistInStorage();
  }

  getPhraseCooldownTimestamp() {
    return this.phraseCooldownTimestamp;
  }

  setPhraseCooldownTimeStamp() {
    const now = new Date();
    this.phraseCooldownTimestamp = now;
    this.persistInStorage();
  }

  resetPhraseAndRelatedAfterCooldownFinish() {
    this.phraseCooldownTimestamp = null;
    this.uniquePhrase = generateUniquePhrase();
    this.questionsCount = 0;
    this.persistInStorage();
  }

  canTransitionTo(nextState) {
    return TRANSITIONS[this.currentState].includes(nextState);
  }

  transitionTo(nextState) {
    if (!this.canTransitionTo(nextState)) {
      console.log(
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

    if (
      this.phraseCooldownTimestamp instanceof Date &&
      this.phraseCooldownTimestamp != null &&
      this.phraseCooldownTimestamp != "" &&
      Number.isNaN(this.phraseCooldownTimestamp) === false
    ) {
      storeInStorage(
        PHRASE_COOLDOWN_TIMESTAMP,
        this.phraseCooldownTimestamp.toISOString(),
      );
    } else {
      storeInStorage(PHRASE_COOLDOWN_TIMESTAMP, this.phraseCooldownTimestamp);
    }
  }

  restoreFromStorage() {
    const state = retrieveFromStorage(STATE_STORAGE_KEY);
    const phrase = retrieveFromStorage(UNIQUE_PHRASE_STORAGE_KEY);
    const uuid = retrieveFromStorage(UUID_STORAGE_KEY);
    const questionsCount = retrieveFromStorage(QUESTIONS_COUNT_KEY);
    const phraseCooldownTimestamp = retrieveFromStorage(
      PHRASE_COOLDOWN_TIMESTAMP,
    );

    if (state && Object.values(State).includes(state)) {
      this.currentState = state;
    }

    if (typeof phrase === "string" && phrase.length > 0) {
      this.uniquePhrase = phrase;
    }

    if (typeof uuid === "string" && uuid.length > 0) {
      this.UUID = uuid;
    }

    if (
      typeof questionsCount === "string" &&
      Number.isNaN(questionsCount) === false
    ) {
      this.questionsCount = parseInt(questionsCount);
    }

    if (
      typeof phraseCooldownTimestamp === "string" &&
      phraseCooldownTimestamp.length > 0 &&
      phraseCooldownTimestamp != "null" &&
      phraseCooldownTimestamp != null
    ) {
      const value = new Date(phraseCooldownTimestamp);
      if(!Number.isNaN(value.getTime())){
        this.phraseCooldownTimestamp = value
      }
    }
  }

  reset() {
    this.currentState = State.PHRASE_ISSUED;
    this.uniquePhrase = generateUniquePhrase();
    this.UUID = generateUUIDv4();
    this.questionsCount = 0;
    this.phraseCooldownTimestamp = null;
    this.persistInStorage();
  }

  validateCurrentRoute() {
    const expectedRoute = ROUTE_STATE_MAP[this.currentState];

    if (window.location.pathname !== expectedRoute) {
      window.location.replace(expectedRoute);
    }
  }
}

//state machine in submit identity page
// export const stateMachine = new stateMachineClass({
//   currentState: State.SUBMIT_PHRASE,
//   uniquePhrase: "2876desert",
//   questionsCount: 0,
//   phraseCooldownTimestamp: new Date(),
//   UUID: "84bbe3cb-956f-43a9-bc49-997dc30276bf",
//   skipInitialRestoreFromStorage: false
// });


export const stateMachine = new stateMachineClass({})