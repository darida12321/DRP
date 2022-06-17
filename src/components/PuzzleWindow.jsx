import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getLessonData } from "../firebase.js";

import "../styles/TutorialWindow.css";

function PuzzleWindow(props) {
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState({});

  // Fetch the data when visiting page
  useEffect(() => {
    async function fetchData() {
      const lessonIndex = props.lesson - 1;
      const data = await getLessonData(props.chapter);
      const lessonData = data[lessonIndex];
      lessonData.lessonNum = data.length;
      setLessonData(lessonData);
    }
    fetchData();
  }, [props.lesson, props.chapter]);

  // Set up the next lesson shortcut once examples are complete
  useEffect(() => {
    function shortcutHandler(e) {
      if (Object.keys(lessonData).length === 0) {
        return;
      }
      if (e.key === "Enter" && e.shiftKey 
          && props.lesson < lessonData.lessonNum) {
        const link = "/vim/" + props.chapter + "/" + (parseInt(props.lesson) + 1);
        navigate(link, { replace: true });
      }
      if (e.key === "\n" && e.ctrlKey 
          && props.lesson > 1) {
        const link = "/vim/" + props.chapter + "/" + (parseInt(props.lesson) - 1);
        navigate(link, { replace: true });
      }
    };
    document.addEventListener("keypress", shortcutHandler);
    return (() => {
      document.removeEventListener('keypress', shortcutHandler)
    })
  }, [lessonData, props, navigate]);

  // Return the document
  return (
    <div id="tutorial">
      <div id="header">
        <Link
          id="prev-lesson"
          style={{ visibility: props.lesson <= 1 ? "hidden" : "" }}
          to={`/vim/${props.chapter}/${Number(props.lesson) - 1}`}
        >
          {"< Prev"}
        </Link>
        <h1 id="lesson-title">
          Lesson {props.lesson}: {lessonData.lesson && lessonData.lesson.title}
        </h1>
        <Link
          id="next-lesson"
          style={{ visibility: props.lesson >= lessonData.lessonNum ? "hidden" : "" }}
          to={`/vim/${props.chapter}/${Number(props.lesson) + 1}`}
        >
          {"Next >"}
        </Link>
      </div>

      <div id="textbox">
        <p id="lesson-desc">{lessonData.lesson && lessonData.lesson.description}</p>
      </div>

    </div>
  );
}

export default PuzzleWindow;
