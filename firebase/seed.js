import { doc, setDoc } from "firebase/firestore"
import { db } from "./firebase.js"
import { FIRESTORE_SEED_MODEL } from "./models.js"

async function seed() {
  for (const [collection, docs] of Object.entries(FIRESTORE_SEED_MODEL)) {
    for (const [docId, data] of Object.entries(docs)) {
      await setDoc(doc(db, collection, docId), data)
      console.log(`✔ Seeded ${collection}/${docId}`)
    }
  }

  console.log("🌱 Firestore seeded successfully")
}

seed().catch(console.error)
