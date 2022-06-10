import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

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

// Get Google Analytics data
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export async function getLessonData(chapter) {
  const querySnapshot = await getDocs(collection(db, "vim/chapter" + chapter + "/lessons"));
  if (!querySnapshot) return;

  const lessonData = [];
  querySnapshot.forEach((doc) => {
    lessonData.push(doc.data());
  });
  return lessonData;
}
