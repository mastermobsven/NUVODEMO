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

export const TRANSITIONS = {
  [State.PHRASE_ISSUED]: [State.QUESTIONS, State.SUBMIT_PHRASE],

  [State.QUESTIONS]: [State.LIMIT_REACHED, State.SUBMIT_PHRASE],

  [State.LIMIT_REACHED]: [State.PHRASE_ISSUED],

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
export const PHRASE_COOLDOWN_TIMESTAMP = "phrase-cooldown-timestamp";
export const STATE_STORAGE_KEY = "state";
export const UUID_STORAGE_KEY = "UUID";
export const QUESTIONS_COUNT_KEY = "questions-count";

export const QA_SET = [
  ["Who is this for?", "Those who arrive."],
  ["Is this a membership?", "No."],
  ["Is there value in an identity?", "Only to the holder."],
  ["Can an identity be transferred?", "Yes."],
  ["How many identities exist?", "Fewer than you think."],
  ["Can I try again later?", "You may return."],
  ["Why are questions limited?", "So answers matter."],
  ["Who runs this system?", "The system runs itself."],
  ["What happens after I receive an identity?", "You wait."],
  ["What happens if I don’t receive one?", "You decide what to do next."],
  ["Is this social media?", "No."],
  ["Is this art?", "That depends on you."],
  ["Is this serious?", "Entirely."],
  ["Can I lose an identity?", "Yes."],
  ["Can I hold more than one?", "No."],
  ["Is this anonymous?", "Yes."],
  ["How long has this existed?", "Long enough."],
  ["Why am I here?", "You arrived."],
  ["What is NUVO?", "A system."],
  ["What is the door?", "You are at it."],
  ["What should I do next?", "Continue."],
];

export const COOLDOWN_MS = 60 * 3 * 1000; // 60 minutes

export const SUCCESS_PROBABILITY = 0.2
