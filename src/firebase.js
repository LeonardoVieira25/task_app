import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwuzt6lOfhR3IoQN37QznDST7WiUItndo",
  authDomain: "task-app-92620.firebaseapp.com",
  projectId: "task-app-92620",
  storageBucket: "task-app-92620.appspot.com",
  messagingSenderId: "604274371925",
  appId: "1:604274371925:web:bb8316e99db5f9445b93dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


// auth.currentUser()