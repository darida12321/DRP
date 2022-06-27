import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/ArtWindow.css";

function ArtWindow(props) {
  const navigate = useNavigate();

  // Set up the next lesson shortcut once examples are complete
  useEffect(() => {
    function shortcutHandler(e) {
      if (Object.keys(props.lessonData).length === 0) {
        return;
      }
      if (e.key === "Enter" && e.shiftKey 
          && props.lesson < props.lessonData.lessonNum) {
        const link = `/${props.course}/${props.chapter}/${Number(props.lesson) + 1}`;
        navigate(link, { replace: true });
      }
      if (e.key === "Enter" && e.ctrlKey 
          && props.lesson > 1) {
        const link = `/${props.course}/${props.chapter}/${Number(props.lesson) - 1}`;
        navigate(link, { replace: true });
      }
    };
    document.addEventListener("keydown", shortcutHandler);
    return (() => {
      document.removeEventListener('keydown', shortcutHandler)
    })
  }, [props.lessonData, props, navigate]);

  // Return the document
  return (
    <div id="tutorial">
      <div id="header">
        <Link
          id="prev-lesson"
          style={{ visibility: props.lesson <= 1 ? "hidden" : "" }}
          to={`/${props.course}/${props.chapter}/${Number(props.lesson) - 1}`}
        >
          {"< Prev"}
        </Link>
        <h1 id="lesson-title">
          Lesson {props.lessonData && props.lessonData.lessonCurr}: {props.lessonData && props.lessonData.lesson && props.lessonData.lesson.title}
        </h1>
        <Link
          id="next-lesson"
          style={{ visibility: props.lesson >= (props.lessonData && props.lessonData.lessonNum) ? "hidden" : "" }}
          to={`/${props.course}/${props.chapter}/${Number(props.lesson) + 1}`}
        >
          {"Next >"}
        </Link>
      </div>

      <div id="textbox">
        <p id="lesson-desc">{props.lessonData && props.lessonData.lesson && props.lessonData.lesson.description}</p>
      </div>

      <div id="drawing-space"></div>
    </div>
  );
}

export default ArtWindow;
