import React, { useEffect } from "react";
import { db } from "../firebase.js";
import { collection, doc, getDoc, addDoc, setDoc, getDocs } from "firebase/firestore";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

function onChange(newValue) {
  console.log("Editor changed", newValue);
}

// TODO fetch data from a backend
async function getLessonData() {
  // const querySnapshot = await getDocs(collection(db, "vim"));
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data().chapters}`);
  // });
}

// async function moveData() {
//   const docSnap = await getDocs(collection(db, "vim/chapters/lessons"));
//   var items = [];
//   docSnap.forEach((doc) => {
//     items.push(doc.data());
//   });
//   console.log(items);

//   await setDoc(doc(db, "vim/chapter1/lessons", "lesson1"), items[0]);
//   await setDoc(doc(db, "vim/chapter1/lessons", "lesson2"), items[1]);
//   await setDoc(doc(db, "vim/chapter1/lessons", "lesson3"), items[2]);
//   await setDoc(doc(db, "vim/chapter1/lessons", "lesson4"), items[3]);
//   await setDoc(doc(db, "vim/chapter1/lessons", "lesson5"), items[4]);
//   await setDoc(doc(db, "vim/chapter1/lessons", "lesson6"), items[5]);
// }

function TutorialWindow() {
  const [lesson, setLesson] = React.useState({});

  React.useEffect(() => {
    setLesson(getLessonData());
  }, []);

  let complete = true;

  // Get style variables from style.css
  var style = getComputedStyle(document.body);
  const boxShadowDefault = style.getPropertyValue("--blue-0");
  const boxShadowComplete = style.getPropertyValue("--green-0");

  return (
    <div className="tutorial">
      <div
        className="textbox"
        style={{ boxShadow: "inset 20px 0" + (complete ? boxShadowDefault : boxShadowComplete) }}
      >
        <div>
          <h1>
            Lesson {lesson.id}: {lesson.title}
          </h1>
          <p>{lesson.desc}</p>
        </div>
        <div>
          <div className="marker">1/5</div>
        </div>
      </div>
      <div className="editor-container">
        <AceEditor mode="java" theme="github" onChange={onChange} name="editor" />
      </div>
    </div>
  );
}

export default TutorialWindow;
