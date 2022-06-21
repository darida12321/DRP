import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import ace from "ace-builds/src-noconflict/ace";

import "../styles/SpeedrunWindow.css";
import SpeedrunCodeEditor from "./SpeedrunCodeEditor";

function SpeedrunWindow(props) {
  const [completed, setCompleted] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [currTime, setCurrTime] = useState(Date.now())
  const navigate = useNavigate();

  // Reset variables when prop updates
  useEffect(() => {
    setCompleted(false)
  }, [props])

  const reset = useCallback(() => {
    const editor = ace.edit('editor')
    const init = props.lessonData.puzzle.init
    editor.setValue(init.code);
    editor.moveCursorTo(init.cLine, init.cPos);
    editor.session.selection.clearSelection();

    setCompleted(false)
    setStartTime(null)

    const textInput = ace.edit('editor').textInput.getElement()
    textInput.focus()
  }, [props.lessonData.puzzle.init])

  // Update the current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrTime(Date.now());
    }, 30);
    return () => clearInterval(timer)
  }, []);

  // Set up the next lesson shortcut once examples are complete
  useEffect(() => {
    function shortcutHandler(e) {
      if (Object.keys(props.lessonData).length === 0) {
        return;
      }
      if (e.key === 'Enter' && e.altKey){
        reset()
      }
      if (e.key === "Enter" && e.shiftKey 
          && props.lesson < props.lessonData.lessonNum) {
        const link = "/vim/" + props.chapter + "/" + (parseInt(props.lesson) + 1);
        navigate(link, { replace: true });
      }
      if (e.key === "Enter" && e.ctrlKey 
          && props.lesson > 1) {
        const link = "/vim/" + props.chapter + "/" + (parseInt(props.lesson) - 1);
        navigate(link, { replace: true });
      }
    };
    document.addEventListener("keydown", shortcutHandler);
    return (() => {
      document.removeEventListener('keydown', shortcutHandler)
    })
  }, [reset, props.lessonData, props, navigate]);

  function onCompletion() {
    console.log('speedrun complete')
    setCompleted(true)
  }

  // Get style variables from style.css
  //var style = getComputedStyle(document.body);
  //const cDefault = style.getPropertyValue("--blue-1");
  //const cComplete = style.getPropertyValue("--green-1");
  //const cError = style.getPropertyValue("--red-1");

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
          Lesson {props.lessonData && props.lessonData.lessonCurr}: {props.lessonData && props.lessonData.lesson && props.lessonData.lesson.title}
        </h1>
        <Link
          id="next-lesson"
          style={{ visibility: props.lesson >= (props.lessonData && props.lessonData.lessonNum) ? "hidden" : "" }}
          to={`/vim/${props.chapter}/${Number(props.lesson) + 1}`}
        >
          {"Next >"}
        </Link>
      </div>

      <div id="textbox">
        <div id="content">
          <p id="lesson-desc">{props.lessonData && props.lessonData.lesson && props.lessonData.lesson.description}</p>
          <h1>{currTime}</h1>
          <h1>{startTime}</h1>
          <div id="timer">{completed ? 'asd' : 'jahgld'}</div>
        </div>
        <div id="solution-area">
          <div id="retry"
            onClick={reset}
          >Retry</div>
        </div>
      </div>

      <SpeedrunCodeEditor 
        lessonData={props.lessonData} 
        startTime={startTime}
        setStartTime={setStartTime}
        onCompletion={onCompletion}
      />
    </div>
  );
}

export default SpeedrunWindow;
