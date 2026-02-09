
## 📦 NUVO Project

NUVO Systems Behavioral Door Demo with Metrics Dashboard

Project Purpose
This project is a behavioral demo. The sole purpose is to observe and measure how users behave when interacting with a controlled identity issuance flow that introduces limits, friction, and uncertainty. The demo is used for focus group testing.

---

## 🔥 Firebase Setup

### 1️⃣ Create a Firebase Project

1. Go to 👉 https://console.firebase.google.com  
2. Click **Add project**  
3. Project name: for example `nuvo-demo`  
4. **Disable Google Analytics** (not required for this demo)  
5. Click **Create project**

---

### 2️⃣ Create a Web App

Inside your Firebase project:

1. Click on the **</> Web** icon  
2. App name: `nuvo-web`  
3. **Do NOT enable Firebase Hosting**  
4. Click **Register app**

Firebase will display a configuration object similar to this:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
````

📌 **Save this configuration**, you will need it in the next steps.

---

### 3️⃣ Enable Firestore Database

1. In the sidebar, go to **Firestore Database**
2. Click **Create database**
3. Select **Start in test mode** (for development only)
4. Choose a location (use the suggested one)

⚠️ **Important:** Test mode is **temporary** and should be restricted before production.

---

## ⚙️ Firebase Project Configuration

Now we will configure Firebase inside the project.

### 1️⃣ Add Firebase Config

Replace the existing Firebase configuration with the one generated earlier in the following files:

* `demo/js/firebase.js`
* `firebase/firebase.js`

---

### 2️⃣ Seed the Database (Create Initial Models)

This project includes a seeding script to initialize Firestore collections and documents.

#### Prerequisites

* Node.js installed

#### Steps

Navigate to the Firebase models folder:

```bash
cd firebase
```

Install dependencies:

```bash
npm install
```

Run the seed script:

```bash
node seed.js
```

✅ Firestore database is now populated with the required models.

---

## ▶️ Running the Demo

Once Firebase is configured and the database is ready:

1. Navigate to the demo folder:

```bash
cd demo
```

2. Serve `index.html` using any local server, for example:

* Live Server (VS Code)
* Python:

  ```bash
  python -m http.server
  ```
* Any static file server of your choice

Open the browser and access the demo from the local server URL.

---

## 📊 Dashboard

The project includes a simple password-protected dashboard.

* Access it at:

  ```
  /dashboard.html
  ```

* **Default password:**

  ```
  1234
  ```

🔐 The password can be changed directly in Firebase, inside the **`secrets`** collection.

---

## 📝 Notes

* This project is intended for demo and development purposes.
* Remember to secure Firestore rules before deploying to production.
* Firebase Hosting is intentionally not used in this setup.

---

🚀 Enjoy exploring the NUVO demo!