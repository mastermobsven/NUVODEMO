import { retrieveFromStorage, storeInStorage } from "./use-storage.js";
import { generateUniquePhrase } from "./generators.js";
import {
  State,
  TRANSITIONS,
  ROUTE_STATE_MAP,
  STATE_STORAGE_KEY,
  UNIQUE_PHRASE_STORAGE_KEY,
  PHRASE_COOLDOWN_TIMESTAMP,
  QUESTIONS_COUNT_KEY,
  ATTEMPTS_KEY,
  VISITOR_FIELDS_MAP,
  CONSTANTS_MAP,
  QUESTIONS_COOLDOWN_TIMESTAMP
} from "./constants.js";

export class stateMachineClass {
  config;
  visitorSession;
  UUID;

  cooldownMs
  currentState;
  uniquePhrase;
  questionsCount;
  attempts;
  successProbability;
  phraseCooldownTimestamp;
  questionsCooldownTimestamp;

  constructor({
    config,
    visitorSession,
    UUID,
    currentState = State.PHRASE_ISSUED,
    uniquePhrase = generateUniquePhrase(),
    questionsCount = 0,
    phraseCooldownTimestamp = null,
    questionsCooldownTimestamp = null,
    attempts = 0,
    cooldownMs = null,
    successProbability = null,
    skipInitialRestoreFromStorage = false,
  }) {
    if (!config) {
      throw new Error("StateMachine requires config");
    }

    if (!visitorSession) {
      throw new Error("StateMachine requires visitorSession");
    }

    if (!UUID) {
      throw new Error("StateMachine requires UUID");
    }

    this.UUID = UUID;

    this.config = config;
    this.visitorSession = visitorSession;

    this.currentState = currentState;
    this.uniquePhrase = uniquePhrase;
    this.questionsCount = questionsCount;
    this.phraseCooldownTimestamp = phraseCooldownTimestamp;
    this.questionsCooldownTimestamp = questionsCooldownTimestamp
    this.attempts = attempts;

    if (skipInitialRestoreFromStorage === false) {
      this.restoreFromStorage();
    }

    this.persistInStorage();
    this.showContent()
    //this.validateCurrentRoute();

    // initialize successProbability
    if (successProbability != null) {
      this.successProbability = successProbability;
    } else {
      this.successProbability = this.calculateSuccessProbability({
        attempt: this.attempts,
      });
    }

    // initialize cooldownMs
    if(cooldownMs != null){
      this.cooldownMs = cooldownMs
    }else{
      this.cooldownMs = this.calculateCooldownMs({attempt: this.attempts})
    }

    console.log(
      "[State Machine] Success Probability:",
      this.successProbability,
    );
    console.log(
      "[State Machine] Cooldown time ms:",
      this.cooldownMs,
    );
    console.log("[State Machine] Attempt:", this.attempts);
  }

  getConfig() {
    return this.config;
  }

  getVisitorSession() {
    return this.visitorSession;
  }

  getUUID() {
    return this.UUID;
  }

  getState() {
    return this.currentState;
  }

  getUniquePhrase() {
    return this.uniquePhrase;
  }

  getAttempts() {
    return this.attempts;
  }

  increaseAttempts() {
    const currentAttempts = this.attempts;
    this.attempts = currentAttempts + 1;
    this.persistInStorage();
  }

  getCooldownMs(){
    return this.cooldownMs
  }

  calculateCooldownMs({attempt}){
    if (attempt <= 0) {
      return this.config[CONSTANTS_MAP.COOLDOWN_SEC_RATES][0] * 1000;
    }
    return (
      this.config[CONSTANTS_MAP.COOLDOWN_SEC_RATES][attempt - 1] * 1000
    );
  }

  getSuccessProbability() {
    return this.successProbability;
  }

  calculateSuccessProbability({ attempt }) {
    if (attempt <= 0) {
      return this.config.SUCCESS_PROBABILITY_RATES[0];
    }
    return (
      this.config.SUCCESS_PROBABILITY_RATES[attempt - 1]
    );
  }

  getQuestionsCount() {
    return this.questionsCount;
  }

  increaseQuestionsCount() {
    const currentCount = this.questionsCount;
    this.questionsCount = currentCount + 1;
    this.persistInStorage();
  }

  getQuestionsCooldownTimestamp() {
    return this.questionsCooldownTimestamp;
  }

  setQuestionsCooldownTimestamp(){
    const now = new Date();
    this.questionsCooldownTimestamp = now;
    this.persistInStorage();
  }

  getQuestionsPageDurationMs(){
    return this.config[CONSTANTS_MAP.QUESTION_PAGE_DURATION_SEC] * 1000
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
    this.questionsCooldownTimestamp = null
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

    window.location.replace(ROUTE_STATE_MAP[nextState]);
    return true;
  }

  persistInStorage() {
    storeInStorage(STATE_STORAGE_KEY, this.currentState);
    storeInStorage(UNIQUE_PHRASE_STORAGE_KEY, this.uniquePhrase);
    storeInStorage(QUESTIONS_COUNT_KEY, this.questionsCount);
    storeInStorage(ATTEMPTS_KEY, this.attempts);

    // phrase cooldown timestamp persist
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

    // questions cooldown timestamp persist
    if (
      this.questionsCooldownTimestamp instanceof Date &&
      this.questionsCooldownTimestamp != null &&
      this.questionsCooldownTimestamp != "" &&
      Number.isNaN(this.questionsCooldownTimestamp) === false
    ) {
      storeInStorage(
        QUESTIONS_COOLDOWN_TIMESTAMP,
        this.questionsCooldownTimestamp.toISOString(),
      );
    } else {
      storeInStorage(QUESTIONS_COOLDOWN_TIMESTAMP, this.questionsCooldownTimestamp);
    }
  }

  restoreFromStorage() {
    const state = retrieveFromStorage(STATE_STORAGE_KEY);
    const phrase = retrieveFromStorage(UNIQUE_PHRASE_STORAGE_KEY);
    const questionsCount = retrieveFromStorage(QUESTIONS_COUNT_KEY);
    const phraseCooldownTimestamp = retrieveFromStorage(
      PHRASE_COOLDOWN_TIMESTAMP,
    );
    const questionsCooldownTimestamp = retrieveFromStorage(
      QUESTIONS_COOLDOWN_TIMESTAMP,
    );
    const attempts = retrieveFromStorage(ATTEMPTS_KEY);

    if (state && Object.values(State).includes(state)) {
      this.currentState = state;
    }

    if (typeof phrase === "string" && phrase.length > 0) {
      this.uniquePhrase = phrase;
    }

    if (typeof attempts === "string" && Number.isNaN(attempts) === false) {
      this.attempts = parseInt(attempts);
    }

    if (
      typeof questionsCount === "string" &&
      Number.isNaN(questionsCount) === false
    ) {
      this.questionsCount = parseInt(questionsCount);
    }

    // phrase cooldown timestamp restore
    if (
      typeof phraseCooldownTimestamp === "string" &&
      phraseCooldownTimestamp.length > 0 &&
      phraseCooldownTimestamp != "null" &&
      phraseCooldownTimestamp != null
    ) {
      const value = new Date(phraseCooldownTimestamp);
      if (!Number.isNaN(value.getTime())) {
        this.phraseCooldownTimestamp = value;
      }
    }

    // questions cooldown timestamp restore
    if (
      typeof questionsCooldownTimestamp === "string" &&
      questionsCooldownTimestamp.length > 0 &&
      questionsCooldownTimestamp != "null" &&
      questionsCooldownTimestamp != null
    ) {
      const value = new Date(questionsCooldownTimestamp);
      if (!Number.isNaN(value.getTime())) {
        this.questionsCooldownTimestamp = value;
      }
    }
  }

  reset() {
    this.currentState = State.PHRASE_ISSUED;
    this.uniquePhrase = generateUniquePhrase();
    this.questionsCount = 0;
    this.phraseCooldownTimestamp = null;
    this.questionsCooldownTimestamp = null;
    this.attempts = 0;
    this.successProbability = this.calculateSuccessProbability({
      attempt: this.attempts,
    });
    this.persistInStorage();
  }

  validateCurrentRoute() {
    if (this.visitorSession[VISITOR_FIELDS_MAP.DEMO_COMPLETED] === true) {
      
      if (window.location.pathname === ROUTE_STATE_MAP[State.DEMO_COMPLETED]){
        this.showContent();
        return
      }
      
      this.currentState = State.DEMO_COMPLETED;
      this.persistInStorage();

      window.location.replace(ROUTE_STATE_MAP[State.DEMO_COMPLETED]);
      return;
    }

    if (
      this.attempts > this.config[CONSTANTS_MAP.MAX_ATTEMPTS] &&
      window.location.pathname !== ROUTE_STATE_MAP[State.FEEDBACK]
    ) {
      this.currentState = State.FEEDBACK;
      this.persistInStorage();

      window.location.replace(ROUTE_STATE_MAP[State.FEEDBACK]);
      return;
    }

    const expectedRoute = ROUTE_STATE_MAP[this.currentState];

    if (window.location.pathname !== expectedRoute) {
      window.location.replace(expectedRoute);
	  return
    }

    this.showContent()
  }

  showContent() {
    const siteWrapper = document.getElementById("site-wrapper");
    siteWrapper.classList.remove("hidden");
  }
}
