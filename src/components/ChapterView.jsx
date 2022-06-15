import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLessonData, getChapterData } from "../firebase.js";

import "../styles/ChapterView.css";

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
                <div className="chapter-blob" />
                <div className="chapter-line" />
              </div>

              <Link 
                to={`/vim/${props.chapter}/${i + 1}`} 
                className="link">
                <p className="lesson-title">{l}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChapterView;
