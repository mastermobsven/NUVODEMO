const PASSWORD = "1234";

const loginScreen = document.getElementById("login-screen");
const dashboardScreen = document.getElementById("dashboard-screen");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");

loginBtn.addEventListener("click", () => {
  if (passwordInput.value === PASSWORD) {
    loginScreen.classList.add("hidden");
    dashboardScreen.classList.remove("hidden");
    
    loadMetrics();
    loadFeedback();
  } else {
    loginError.classList.remove("hidden");
  }
});

/**
 * METRICS LOGIC
 */
async function loadMetrics() {
  const metrics = await fetchMetricsFromBackend();

  document.getElementById("total-visitors").textContent = metrics.totalVisitors;
  document.getElementById("phrases-generated").textContent = metrics.phrasesGenerated;
  document.getElementById("questions-asked").textContent = metrics.questionsAsked;
  document.getElementById("phrase-submissions").textContent = metrics.phraseSubmissions;
  document.getElementById("identities-issued").textContent = metrics.identitiesIssued;
  document.getElementById("failures").textContent = metrics.failures;
  document.getElementById("transfer-claims").textContent = metrics.transferClaims;
}

async function fetchMetricsFromBackend() {
  return {
    totalVisitors: 0,
    phrasesGenerated: 0,
    questionsAsked: 0,
    phraseSubmissions: 0,
    identitiesIssued: 0,
    failures: 0,
    transferClaims: 0
  };
}

/**
 * FEEDBACK LOGIC
 */
async function loadFeedback() {
  const feedbackContainer = document.getElementById("feedback-container");
  
  try {
    const feedbackList = await fetchFeedbackFromBackend();
    renderFeedbackList(feedbackList);
  } catch (error) {
    console.error("Error loading feedback:", error);
    feedbackContainer.innerHTML = "<p class='error'>Error loading data</p>";
  }
}

async function fetchFeedbackFromBackend() {
  return [
    {
      id: "e4c5f5a2-c2bc-4d63-b2d9-e2d875efd102",
      demoCompleted: true,
      feedback: {
        feelings: ["CURIOUS", "FRUSTRATED"],
        notes: "bla bla bla",
        systemIdea: "Nothing",
        wouldRetry: "NO"
      }
    },
    {
      id: "e4c5f5a2-c2bc-4d63-b2d9-e2d875efd102",
      demoCompleted: true,
      feedback: {
        feelings: ["CURIOUS", "FRUSTRATED"],
        notes: "bla bla",
        systemIdea: "Nothing",
        wouldRetry: "NO"
      }
    },
    {
      id: "e4c5f5a2-c2bc-4d63-b2d9-e2d875efd102",
      demoCompleted: true,
      feedback: {
        feelings: ["CURIOUS", "FRUSTRATED"],
        notes: "bla bla",
        systemIdea: "Nothing",
        wouldRetry: "NO"
      }
    },
    {
      id: "e4c5f5a2-c2bc-4d63-b2d9-e2d875efd102",
      demoCompleted: true,
      feedback: {
        feelings: ["CURIOUS", "FRUSTRATED"],
        notes: "bla bla",
        systemIdea: "Nothing",
        wouldRetry: "NO"
      }
    },
  ];
}

function renderFeedbackList(items) {
  const container = document.getElementById("feedback-container");
  container.innerHTML = ""; 

  if (items.length === 0) {
    container.innerHTML = "<p>No feedback available.</p>";
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "feedback-card";

    const feelingsHtml = item.feedback.feelings
      ? item.feedback.feelings.map(f => `<span class="feeling-tag">${f}</span>`).join("")
      : "";

    card.innerHTML = `
      <div class="card-header">
        <span class="feedback-id">REF_ID: ${item.id.slice(0, 20)}...</span>
        <div class="feelings-container">
          ${feelingsHtml}
        </div>
      </div>

      <div class="feedback-body">
        <label class="content-label">User Notes</label>
        <div class="feedback-text">"${item.feedback.notes || 'No comments left.'}"</div>
        
        <label class="content-label">System Idea</label>
        <div class="feedback-text idea-text">"${item.feedback.systemIdea || 'No ideas provided.'}"</div>
      </div>

      <div class="feedback-meta">
        <span>Would Retry: <strong>${item.feedback.wouldRetry}</strong></span>
      </div>
    `;
    
    container.appendChild(card);
  });
}