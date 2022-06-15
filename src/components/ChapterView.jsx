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
      });

      setLessons({
        title: title,
        lessons: lessons,
      });
    }
    fetchData();
  }, [props.chapter, props.lesson]);

  return (
    <div className="chapter">
      <h1 className="chapterNumber">Chapter {props.chapter}</h1>
      <h3 className="chapterTitle">{lessons.title && lessons.title}</h3>
      <div className="lessons-view">
        {lessons.lessons &&
          lessons.lessons.map((l) => (
            <div className="lesson" key={l.id}>
              <div className="lesson-marker"></div>
              <Link to={`/vim/${props.chapter}/${l.id}`} className="link">
                <p>{l.lesson}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChapterView;
