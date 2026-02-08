import { db } from "../firebase.js"
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

const configContainer = document.getElementById("config-container")

export async function loadSystemConfig() {
  const configs = await fetchSystemConfig()

  configContainer.innerHTML = ""

  configs.forEach(config => {
    const row = document.createElement("div")
    row.className = "config-row"

    const inputType = Array.isArray(config.value) ? "text" : "number"

    row.innerHTML = `
      <div class="config-info">
        <span class="config-key">${config.id}</span>
        <span class="config-desc">${config.description ?? ""}</span>
      </div>

      <input
        class="config-input"
        data-key="${config.id}"
        type="${inputType}"
        value="${Array.isArray(config.value) ? config.value.join(", ") : config.value}"
      />

      <button class="config-save">Save</button>
    `

    const saveBtn = row.querySelector(".config-save")
    const input = row.querySelector(".config-input")

    saveBtn.addEventListener("click", async () => {
      let newValue = input.value

      // normalize value
      if (Array.isArray(config.value)) {
        newValue = newValue
          .split(",")
          .map(v => Number(v.trim()))
          .filter(v => !isNaN(v))
      } else {
        newValue = Number(newValue)
      }

      await updateSystemConfig(config.id, newValue)
      saveBtn.textContent = "Saved ✓"

      setTimeout(() => {
        saveBtn.textContent = "Save"
      }, 1500)
    })

    configContainer.appendChild(row)
  })
}

/**
 * Fetch all system config values
 * @returns {Promise<Array<{id, value, description}>>}
 */
export async function fetchSystemConfig() {
  const snapshot = await getDocs(collection(db, "constants"))

  return snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }))
}

/**
 * Update a single config value
 * @param {string} key
 * @param {any} value
 */
export async function updateSystemConfig(key, value) {
  const ref = doc(db, "constants", key)

  await updateDoc(ref, {
    value: value
  })
}

