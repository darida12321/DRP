import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import LessonCodeEditor from "./LessonCodeEditor";

import "../styles/LessonWindow.css";

// props:
// - chapter: chapter number (from URL)
// - lesson: lesson number (from URL)
// - lessonData: information about the lesson from database
function LessonWindow(props) {
  const navigate = useNavigate();
  const [exampleNum, setExampleNum] = useState(0);

  // Check if we finished all the examples
  const completed = useCallback(() => {
    if (!props.lessonData.examples) {
      return false;
    }
    return props.lessonData.examples.length === exampleNum;
  }, [exampleNum, props.lessonData]);

  useEffect(() => {
    if (completed()) {
      if (window.localStorage.getItem("signedIn")) {
        const userData = JSON.parse(window.localStorage.getItem("userData"));
        userData.progress.chapter1["lesson" + props.lesson] = true;
        window.localStorage.setItem("userData", JSON.stringify(userData));
      }
    }
  });

  // Set up the next lesson shortcut once examples are complete
  useEffect(() => {
    function shortcutHandler(e) {
      if (Object.keys(props.lessonData).length === 0) {
        return;
      }
      if (e.key === "Enter" && e.shiftKey && props.lesson < props.lessonData.lessonNum) {
        const link = "/vim/" + props.chapter + "/" + (parseInt(props.lesson) + 1);
        navigate(link, { replace: true });
      }
      if (e.key === "\n" && e.ctrlKey && props.lesson > 1) {
        const link = "/vim/" + props.chapter + "/" + (parseInt(props.lesson) - 1);
        navigate(link, { replace: true });
      }
    }
    document.addEventListener("keypress", shortcutHandler);
    return () => {
      document.removeEventListener("keypress", shortcutHandler);
    };
  }, [props.lessonData, exampleNum, completed, props, navigate]);

  // Get style variables from style.css
  var style = getComputedStyle(document.body);
  const colorDefault = style.getPropertyValue("--blue-1");
  const colorComplete = style.getPropertyValue("--green-2");

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
          Lesson {props.lessonData.lessonCurr}: {props.lessonData.lesson && props.lessonData.lesson.title}
        </h1>
        <Link
          id="next-lesson"
          style={{ visibility: props.lesson >= props.lessonData.lessonNum ? "hidden" : "" }}
          to={`/vim/${props.chapter}/${Number(props.lesson) + 1}`}
        >
          {"Next >"}
        </Link>
      </div>

      <div id="textbox">
        <p id="lesson-desc">{props.lessonData.lesson && props.lessonData.lesson.description}</p>
        <div id="lesson-marker">
          <div id="blob" style={{ background: completed() ? colorComplete : colorDefault }}>
            {exampleNum}/{props.lessonData.examples && props.lessonData.examples.length}
          </div>
        </div>
      </div>

      <LessonCodeEditor lessonData={props.lessonData} setExampleNum={setExampleNum} />
    </div>
  );
}

export default LessonWindow;
