import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
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

/* ------------------------------------------------------------------------------------------------- */
/* Database code below */

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Get documents in a given chapter in the vim collection (TODO: make generic for any collection)
export async function getLessonData(courseId, chapterNum) {
  const querySnapshot = await getDocs(collection(db, courseId + "/chapter" + chapterNum + "/lessons"));
  if (!querySnapshot) return;

  const lessonData = [];
  querySnapshot.forEach((doc) => {
    lessonData.push(doc.data());
  });
  return lessonData;
}

// Get chapter title
export async function getChapterData(courseId, chapterNum) {
  const docSnap = await getDoc(doc(db, courseId, "chapter" + chapterNum));
  if (!docSnap.exists()) return;

  return docSnap.data();
}

//todo make submissions for these
// fetch Course Data from the firestore
export async function getCourseData() {
  const coursesRef = collection(db, 'courses');
  const courses = await getDocs(coursesRef);
  if (!courses) return;

  return courses.docs.map((d) => d.data());
}

// needs to be made compatible with things that aren't vim
// Add new Lesson to database
export async function submitLesson(courseId, chapterNum, lessonNum, lessonObj) {
  const docRef = doc(db, `${courseId}/chapter` + chapterNum + "/lessons", "lesson" + lessonNum);
  if (!docRef) {
    console.log("wasn't able to make obj:" + JSON.stringify(lessonObj));
    return;
  }
  await setDoc(docRef, lessonObj, { merge: true });
  console.log("submitted chapter: " + chapterNum + ", lesson: " + lessonNum);
}

// Set user progress
export async function setProgress(userData) {
  const uid = window.localStorage.getItem("uid");
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, userData, { merge: true });
}

/* ------------------------------------------------------------------------------------------------- */
/* User and Authentication functions below */

// Initialize FirebaseUI Authentication
const auth = getAuth(app);

// Initialize the FirebaseUI Widget using Firebase.
export var ui = new firebaseui.auth.AuthUI(auth);

export var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      var user = authResult.user;
      var isNewUser = authResult.additionalUserInfo.isNewUser;

      setUser(isNewUser, user);

      return false;
    },
    uiShown: function () {
      // The widget is rendered -> Hide the loader.
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

// Sets state to indicate a user is signed in
async function setUser(isNewUser, user) {
  if (isNewUser) {
    await addUser(user);
  }

  window.localStorage.setItem("signedIn", true);
  window.localStorage.setItem("uid", user.uid);

  const docSnap = await getDoc(doc(db, "users", user.uid));
  if (!docSnap.exists()) {
    console.log("cannot find user");
    return;
  }

  window.localStorage.setItem("userData", JSON.stringify(docSnap.data()));
  window.history.go(-1);
}

// Add a new user to the database
async function addUser(user) {
  const docRef = doc(db, "users", user.uid);
  const userObj = {
    displayName: user.displayName,
    email: user.email,
    progress: {
      chapter1: {},
    },
  };
  await setDoc(docRef, userObj, { merge: true });
  console.log("added" + user.uid);
}

export function signOut() {
  window.localStorage.clear();
  window.location.reload();
}
