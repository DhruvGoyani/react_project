// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4F37M4wqONy7S-4SQQs8yQ97LhM8KtUQ",
  authDomain: "project-react-e20a5.firebaseapp.com",
  projectId: "project-react-e20a5",
  storageBucket: "project-react-e20a5.appspot.com",
  messagingSenderId: "840981987990",
  appId: "1:840981987990:web:6c57fe401393746129b8b7",
  measurementId: "G-6KLEC3TMBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)