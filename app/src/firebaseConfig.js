// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATBASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export default app;


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCkQrAA-4KfmjcWQY3zZDq7KpESnZDGX_k",
  authDomain: "inventory-management-209ff.firebaseapp.com",
  databaseURL: "https://inventory-management-209ff-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "inventory-management-209ff",
  storageBucket: "inventory-management-209ff.appspot.com",
  messagingSenderId: "450878467557",
  appId: "1:450878467557:web:31854365c7077797cc530c",
  measurementId: "G-V8WPTBF377"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app