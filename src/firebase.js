import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { /*getAuth,*/ GoogleAuthProvider } from "firebase/auth";
// import firebase from "firebase/compat/app";
//import * as firebaseui from "firebaseui";
//import "firebaseui/dist/firebaseui.css";
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
const app = initializeApp(firebaseConfig);

// Get Google Analytics data
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

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
  await setDoc(docRef, lessonObj, { merge: true });
  console.log("submitted chapter: " + chapterNum + ", lesson: " + lessonNum);
}

// export firebaseDoc()

// Initialize FirebaseUI Authentication
//const auth = getAuth(app);

// Initialize the FirebaseUI Widget using Firebase.
//export var ui = new firebaseui.auth.AuthUI(auth);

export var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      console.log("success!");
      // console.log(auth.currentUser);
      console.log(authResult.user);
      console.log(authResult.credential);
      console.log(authResult.user.uid);
      // console.log(redirectUrl);
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    GoogleAuthProvider.PROVIDER_ID,
  ],
};
