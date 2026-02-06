export const State = {
  PHRASE_ISSUED: "PHRASE_ISSUED",
  QUESTIONS: "QUESTIONS",
  LIMIT_REACHED: "LIMIT_REACHED",
  SUBMIT_PHRASE: "SUBMIT_PHRASE",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  TRANSFER_PORTAL: "TRANSFER_PORTAL",
  NO_TRANSFER_PORTAL: "NO_TRANSFER_PORTAL",
  DEMO_WALL: "DEMO_WALL",
  FEEDBACK: "FEEDBACK",
  DEMO_COMPLETED: "DEMO_COMPLETED"
};

export const TRANSITIONS = {
  [State.PHRASE_ISSUED]: [State.QUESTIONS, State.SUBMIT_PHRASE],

  [State.QUESTIONS]: [State.LIMIT_REACHED, State.SUBMIT_PHRASE],

  [State.LIMIT_REACHED]: [State.PHRASE_ISSUED],

  [State.SUBMIT_PHRASE]: [State.SUCCESS, State.FAILURE],

  [State.FAILURE]: [State.TRANSFER_PORTAL, State.NO_TRANSFER_PORTAL, State.LIMIT_REACHED],

  [State.TRANSFER_PORTAL]: [State.LIMIT_REACHED],

  [State.NO_TRANSFER_PORTAL]: [State.LIMIT_REACHED],

  [State.SUCCESS]: [State.DEMO_WALL],

  [State.DEMO_WALL]: [State.FEEDBACK],

  [State.FEEDBACK]: [State.DEMO_COMPLETED],
};

export const ROUTE_STATE_MAP = {
  [State.PHRASE_ISSUED]: "/page1.html",
  [State.QUESTIONS]: "/page2.html",
  [State.LIMIT_REACHED]: "/page9.html",
  [State.SUBMIT_PHRASE]: "/page3.html",
  [State.SUCCESS]: "/page4.html",
  [State.FAILURE]: "/page5.html",
  [State.TRANSFER_PORTAL]: "/page6.html",
  [State.NO_TRANSFER_PORTAL]: "/page7.html",
  [State.DEMO_WALL]: "/page8.html",
  [State.FEEDBACK]: "/page10.html",
  [State.DEMO_COMPLETED]: "/page11.html",
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

export const COOLDOWN_MS = 60 * 1 * 1000; // 60 seconds

export const SUCCESS_PROBABILITY = 1
export const PORTAL_SUCCESS_PROBABILITY = 0.2


// metrics map
export const METRICS_MAP = {
  VISITORS: "visitors",
  PHRASES_GENERATED: "phrasesGenerated",
  QUESTIONS_ASKED: "questionsAsked",
  PHRASE_SUBMISSIONS: "phraseSubmissions",
  SUCCESSES: "successes",
  FAILURES: "failures",
  TRANSFER_CLAIMS: "transferClaims"
}

export const VISITOR_FIELDS_MAP = {
  DEMO_COMPLETED: "demoCompleted"
}
