import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/ChapterView.css";

function ChapterView(props) {
  const [lessons, setLessons] = useState({});

  useEffect(() => {
    setLessons({
      chapter: 1,
      title: "Basic Motions",
      lessons: [
        { id: 1, lesson: "Introduction to Vim" },
        { id: 2, lesson: "Moving a Word Forward" },
        { id: 3, lesson: "Moving a Word Backward" },
        { id: 4, lesson: "word vs. Word" },
        { id: 5, lesson: "Move to the end of word" },
        { id: 6, lesson: "Final Test " },
      ],
    });
  }, []);

  return (
    <div className="chapter">
      <h1 className="chapterNumber">Chapter {lessons.chapter && lessons.chapter}:</h1>
      <h3 className="chapterTitle">{lessons.title && lessons.title}</h3>
      <div className="lessons-view">
        {lessons.lessons &&
          lessons.lessons.map((l) => (
            <div className="lesson" key={l.id}>
              <div className="lesson-marker"></div>
              <Link to={`/vim/${lessons.chapter}/${l.id}`} className="link">
                <p>{l.lesson}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChapterView;
