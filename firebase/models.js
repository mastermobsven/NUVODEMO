export const CONSTANTS_MODEL = {
  AVAILABLE_PORTALS: {
    description:
      "Number of portals available for the demo. Each user that takes a portal, decrease this number.",
    value: 1,
  },

  COOLDOWN_SEC_RATES: {
    description: "Cooldown in seconds for each attempt",
    value: [10, 15, 30, 30, 60, 60, 60, 60],
  },

  MAX_ATTEMPTS: {
    description: "Maximum number of attempts allowed per visitor",
    value: 8,
  },

  SUCCESS_PROBABILITY_RATES: {
    description: "Success probability rates per attempt",
    value: [0.3, 0.25, 0.2, 0.15, 0.1, 0.1, 0.8, 0.85],
  },

  QUESTION_PAGE_DURATION_SEC: {
    description: "Duration of questions page",
    value: 60,
  },

  MAX_QUESTIONS_PER_SESSION: {
    value: 7,
    description: "Maximun number of questions an user can make per session."
  }
}

export const METRICS_MODEL = {
  totals: {
    failures: 0,
    phraseSubmissions: 0,
    phrasesGenerated: 0,
    questionsAsked: 0,
    successes: 0,
    transferClaims: 0,
    visitors: 0,
  },
}

export const FIRESTORE_SEED_MODEL = {
  constants: CONSTANTS_MODEL,
  metrics: METRICS_MODEL,
  secrets: {
    dashboard_password: {password:"1234"}
  }
}
