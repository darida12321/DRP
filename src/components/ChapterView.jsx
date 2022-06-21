import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLessonData, getChapterData } from "../firebase.js";

import "../styles/ChapterView.css";

// props:
// - chapter: chapter number (from URL)
// - lesson: lesson number (from URL)
// - signedIn: if user is signed in (from local storage)
// - userData: user data (from local storage)
function ChapterView(props) {
  const [lessons, setLessons] = useState({});

  useEffect(() => {
    async function fetchData() {
      const chapterData = await getChapterData(props.chapter);
      const title = chapterData.title;

      const lessonResponse = await getLessonData(props.chapter);
      const lessonData = [];
      lessonResponse.forEach((lesson) => {
        lessonData.push(lesson.lesson.title);
      });

      setLessons({
        title: title,
        lessonData: lessonData,
      });
    }
    fetchData();
  }, [props.chapter, props.lesson]);

  return (
    <div id="chapter">
      <h1>Chapter {props.chapter}</h1>
      <h3>{lessons.title && lessons.title}</h3>
      <div id="lessons-view">
        {lessons.lessonData &&
          lessons.lessonData.map((l, i) => (
            <div className="lesson" key={i}>
              <div className="progress-bar">
                <div className={completedBlob(i + 1, props.signedIn, props.userData)} />
                <div className={completedLine(i + 1, props.signedIn, props.userData)} />
              </div>

              <Link to={`/vim/${props.chapter}/${i + 1}`} className="link">
                <p className="lesson-title">{l}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

function completedBlob(lessonNum, signedIn, userData) {
  if (!signedIn) {
    console.log("not signed in");
    return "chapter-blob";
  }

  if (!userData.progress.chapter1["lesson" + String(lessonNum)]) {
    console.log("not found");
    return "chapter-blob";
  }

  if (userData.progress.chapter1["lesson" + String(lessonNum)]) {
    return "chapter-blob-completed";
  } else {
    return "chapter-blob";
  }
}

function completedLine(lessonNum, signedIn, userData) {
  if (!signedIn) {
    console.log("not signed in");
    return "chapter-line";
  }

  if (!userData.progress.chapter1["lesson" + String(lessonNum + 1)]) {
    console.log("not found");
    return "chapter-line";
  }

  if (userData.progress.chapter1["lesson" + String(lessonNum + 1)]) {
    return "chapter-line-completed";
  } else {
    return "chapter-line";
  }
}

export default ChapterView;
