import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getLessonData } from "../firebase.js";

import CodeEditor from "./CodeEditor";

import "../styles/TutorialWindow.css";

function TutorialWindow(props) {
  const navigate = useNavigate();
  const [exampleNum, setExampleNum] = useState(0);
  const [lessonData, setLessonData] = useState({});

  // Check if we finished all the examples
  const completed = useCallback(() => {
    if (!lessonData.examples) {
      return false;
    }
    return lessonData.examples.length === exampleNum;
  }, [exampleNum, lessonData]);

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
    if (Object.keys(lessonData).length === 0) {
      return;
    }
    if (!completed()) {
      return;
    }
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.shiftKey) {
        const link = "/vim/" + props.chapter + "/" + (parseInt(props.lesson) + 1);
        navigate(link, { replace: true });
        //window.location.reload();
      }
    });
  }, [lessonData, exampleNum, completed, props, navigate]);

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
          Lesson {lessonData.num}: {lessonData.lesson && lessonData.lesson.title}
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
        <div id="lesson-marker">
          <div id="blob" style={{ background: completed() ? colorComplete : colorDefault }}>
            {exampleNum}/{lessonData.examples && lessonData.examples.length}
          </div>
        </div>
      </div>

      <CodeEditor lessonData={lessonData} setExampleNum={setExampleNum} />
    </div>
  );
}

export default TutorialWindow;
