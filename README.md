# Sree Balaji Ice Cream — Firebase PWA Prototype

This prototype is a minimal React PWA wired to Firebase.

## What is included
- React app (create-react-app style) with pages:
  - Login, POS, Inventory, Attendance, Dashboard
- Firebase initialization file pre-filled with your project id.
- Firestore security rules (basic).
- Optional Cloud Function example (node).

## Setup (local)
1. Install Node 20+ and npm.
2. Unzip the repo and `cd` into `sree_balaji_icecream_prototype`.
3. Run `npm install`.
4. Create a `.env.local` file in the project root and add real Firebase values:

REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=sree-balaji-ice-cream
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID

(The `REACT_APP_FIREBASE_PROJECT_ID` is already set to your project id.)

5. Run `npm start` to run locally.
6. To deploy: install Firebase CLI, `firebase init hosting`, set build folder to `build`, then `npm run build` and `firebase deploy --only hosting`.

## Notes
- This is a prototype scaffold. Do not use the included Firestore rules for production as-is.
- You will need to configure Firebase Authentication and Firestore in your Firebase console.
