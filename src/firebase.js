import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFL2dtGW4m9pCgiCBP7ePpWDz5nzaXTqw",
  authDomain: "drp-project-2fb9b.firebaseapp.com",
  projectId: "drp-project-2fb9b",
  storageBucket: "drp-project-2fb9b.appspot.com",
  messagingSenderId: "221767278629",
  appId: "1:221767278629:web:4ee28f7f3bfbe2ba9edfcc",
  measurementId: "G-9B4YYR3KSC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
