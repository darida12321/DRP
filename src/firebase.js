import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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

// Get documents in a given chapter in the vim collection (TODO: make generic for any collection)
export async function getLessonData(chapterNum) {
  const querySnapshot = await getDocs(collection(db, "vim/chapter" + chapterNum + "/lessons"));
  if (!querySnapshot) return;

  const lessonData = [];
  querySnapshot.forEach((doc) => {
    lessonData.push(doc.data());
  });
  return lessonData;
}

export async function getChapterData(chapterNum) {
  const docSnap = await getDoc(doc(db, "vim", "chapter" + chapterNum));
  if (!docSnap.exists()) return;

  return docSnap.data();
}

export async function submitLesson(chapterNum, lessonNum, lessonObj) {
  const docRef = doc(db, "vim/chapter" + chapterNum + "/lessons", "lesson" + lessonNum);
  await setDoc(docRef, lessonObj);
  console.log("submitted chapter: " + chapterNum + ", lesson: " + lessonNum);
}

// export firebaseDoc()
