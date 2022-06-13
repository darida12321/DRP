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

      const lessonData = await getLessonData(props.chapter);
      const lessons = [];
      lessonData.forEach((lesson) => {
        lessons.push({
          id: lesson.num,
          lesson: lesson.title,
        });
        lessons.push({
          id: lesson.num,
          lesson: lesson.title,
        });
      });

      setLessons({
        title: title,
        lessons: lessons,
      });
    }
    fetchData();
  }, [props.chapter, props.lesson]);

  return (
    <div id="chapter">
      <h1>Chapter {props.chapter}</h1>
      <h3>{lessons.title && lessons.title}</h3>
      <div id="lessons-view">
        {lessons.lessons &&
          lessons.lessons.map((l) => (
            <div className="lesson" key={l.id}>
              <div className="progress-bar">
                <div className="chapter-blob" />
                <div className="chapter-line" />
              </div>
              <Link to={`/vim/${lessons.chapter}/${l.id}`} className="link">
                <p className="lesson-title">{l.lesson}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChapterView;
