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

export const QA_SET = [
  ["What is this place?", "It’s a deliberately small corner of the internet built around presence rather than performance. It exists to explore what happens when people are allowed to show up without being shaped by reaction."],

  ["Who is this meant for?", "It’s for people who feel the cost of being online more than the benefit. Those who still want conversation, curiosity, and signal but not the constant pressure to be seen."],

  ["Why does this exist at all?", "Because most digital spaces now reward speed, volume, and certainty. This system was created to see what happens when those incentives are removed."],

  ["What is an identity in this system?", "An identity is how you are recognized here, not by profile or status, but by how you engage over time. It’s a way to participate without turning yourself into a product."],

  ["Why is access restricted?", "Because openness at scale changes behavior. Limiting access isn’t about exclusion, it’s about protecting the kind of interaction this space is built for."],

  ["Is this a community?", "Not in the traditional sense. There are no audiences here, only people sharing a space for a period of time."],

  ["What do people actually do once inside?", "They observe, contribute, respond, and sometimes say very little. The system is designed so that silence is as acceptable as participation."],

  ["Is this anonymous?", "Yes, in the sense that real-world identity isn’t the point here. What matters is how someone shows up, not who they are elsewhere."],

  ["Is this social media?", "No. Nothing here is optimized for growth, visibility, or engagement loops. If you’re looking for reach, this won’t help you."],

  ["Why does the system feel restrained?", "Because limits change behavior. When everything isn’t possible, attention becomes more intentional."],

  ["What does the system pay attention to?", "Patterns, not moments. Over time, the system notices what someone returns to not what they perform."],

  ["What doesn’t the system care about?", "Popularity, speed, and dominance. Loudness carries no advantage here."],

  ["What happens after someone receives an identity?", "They’re allowed to enter the space and experience it firsthand. Nothing is unlocked immediately. Understanding comes through time, not instruction."],

  ["What if someone doesn’t receive one?", "Then this experience ends here. Some things aren’t meant to be sampled endlessly. There will be other opportunities once the system is established."],

  ["Can an identity disappear?", "Yes. This system doesn’t preserve everything by default. Presence requires upkeep."],

  ["Can someone hold more than one identity?", "No. This space isn’t designed for experimentation through duplication. It values continuity over optionality."],

  ["Does this system change over time?", "Slowly, and only in response to real use. Stability matters more than novelty."],

  ["Is this art, technology, or philosophy?", "It borrows from all three, but belongs fully to none. What it becomes depends on how it’s used."],

  ["Who decides what’s important here?", "No single person does. The system enforces boundaries, but meaning emerges from participation."],

  ["Will identities be asked to provide personal information?", "No.  The system will never monetize its holders to algorithms and marketing."],

  ["What happens next?", "If the system allows it, you’ll step through the Door and see for yourself.\n\nIf not, you’ll leave with a sense that this place exists — and that may be enough for now."]
];


// storage variables keys
export const UNIQUE_PHRASE_STORAGE_KEY = "uniquePhrase";
export const PHRASE_COOLDOWN_TIMESTAMP = "phrase-cooldown-timestamp";
export const QUESTIONS_COOLDOWN_TIMESTAMP = "questions-cooldown-timestamp";
export const STATE_STORAGE_KEY = "state";
export const UUID_STORAGE_KEY = "UUID";
export const QUESTIONS_COUNT_KEY = "questions-count";
export const ATTEMPTS_KEY = "attempts";

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

// visitor fields map
export const VISITOR_FIELDS_MAP = {
  DEMO_COMPLETED: "demoCompleted",
  feedback: "feedback"
}

// constants map
export const CONSTANTS_MAP = {
  COOLDOWN_SEC_RATES: "COOLDOWN_SEC_RATES",
  SUCCESS_PROBABILITY_RATES: "SUCCESS_PROBABILITY_RATES",
  MIN_SUCCES_PROBABILITY: "MIN_SUCCES_PROBABILITY",
  MAX_ATTEMPTS: "MAX_ATTEMPTS",
  AVAIABLE_PORTALS: "AVAIABLE_PORTALS",
  QUESTION_PAGE_DURATION_SEC: "QUESTION_PAGE_DURATION_SEC",
  MAX_QUESTIONS_PER_SESSION: "MAX_QUESTIONS_PER_SESSION"
}

export const DEFAULT_STATE_MACHINE_CONFIG_VALUES = {
  COOLDOWN_SEC_RATES: [10, 15, 30, 30, 60, 60, 60, 60],
  SUCCESS_PROBABILITY_RATES: [0.30, 0.25, 0.20, 0.15, 0.10, 0.10, 0.8, 0.85],
  MAX_ATTEMPTS: 8,
  AVAIABLE_PORTALS: 8,
  QUESTION_PAGE_DURATION_SEC: 60,
  MAX_QUESTIONS_PER_SESSION: 7
}
