import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db, addEntry } from "../firebase";

import ace from "ace-builds/src-noconflict/ace";

import "../styles/SpeedrunWindow.css";
import clockImgBlue from "../images/clock-icon-blue.svg";
import clockImgGreen from "../images/clock-icon-green.svg";
import SpeedrunCodeEditor from "./SpeedrunCodeEditor";

function SpeedrunWindow(props) {
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currTime, setCurrTime] = useState(Date.now());
  const [leaderboard, setLeaderboard] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setSignedIn(window.localStorage.getItem("signedIn"));
    setUserData(JSON.parse(window.localStorage.getItem("userData")));
  }, []);

  const navigate = useNavigate();

  // Reset variables when prop updates
  useEffect(() => {
    setCompleted(false);
  }, [props]);

  const reset = useCallback(() => {
    const editor = ace.edit("editor");
    const init = props.lessonData.puzzle.init;
    editor.setValue(init.code.replace("\\n", "\n"));
    editor.moveCursorTo(init.cLine, init.cPos);
    editor.session.selection.clearSelection();

    setCompleted(false);
    setStartTime(null);

    const textInput = ace.edit("editor").textInput.getElement();
    textInput.focus();
  }, [props.lessonData.puzzle.init]);

  // Update the current time
  useEffect(() => {
    if (completed) {
      return;
    }
    const timer = setInterval(() => {
      setCurrTime(Date.now());
    }, 30);
    return () => clearInterval(timer);
  }, [completed]);

  // Set up the next lesson shortcut once examples are complete
  useEffect(() => {
    function shortcutHandler(e) {
      if (Object.keys(props.lessonData).length === 0) {
        return;
      }
      if (e.key === "Enter" && e.altKey) {
        reset();
      }
      if (e.key === "Enter" && e.shiftKey && props.lesson < props.lessonData.lessonNum) {
        const link = `/${props.course}/${props.chapter}/${Number(props.lesson) + 1}`;
        navigate(link, { replace: true });
      }
      if (e.key === "Enter" && e.ctrlKey && props.lesson > 1) {
        const link = `/${props.course}/${props.chapter}/${Number(props.lesson) - 1}`;
        navigate(link, { replace: true });
      }
    }
    document.addEventListener("keydown", shortcutHandler);
    return () => {
      document.removeEventListener("keydown", shortcutHandler);
    };
  }, [reset, props.lessonData, props, navigate]);

  // set up leaderboard values to update in realtime
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "vim", "leaderboard"), (doc) => {
      const times = doc.data().times;
      setLeaderboard(times);
    });
    return () => unsub();
  }, []);

  function onCompletion() {
    console.log("speedrun complete in" + diff + "ms");
    if (signedIn) {
      addEntry(leaderboard, userData, diff);
    }
    setCompleted(true);
  }

  // Get style variables from style.css
  //var style = getComputedStyle(document.body);
  //const cDefault = style.getPropertyValue("--blue-1");
  //const cComplete = style.getPropertyValue("--green-1");
  //const cError = style.getPropertyValue("--red-1");
  const diff = currTime - startTime;
  var mins = startTime ? Math.floor((diff / 1000 / 60) % 100).toString() : "0";
  var secs = startTime ? Math.floor((diff / 1000) % 60).toString() : "0";
  var frac = startTime ? Math.floor(diff % 100).toString() : "0";

  mins = mins.length === 1 ? "0" + mins : mins;
  secs = secs.length === 1 ? "0" + secs : secs;
  frac = frac.length === 1 ? "0" + frac : frac;

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
          Lesson {props.lessonData && props.lessonData.lessonCurr}:{" "}
          {props.lessonData && props.lessonData.lesson && props.lessonData.lesson.title}
        </h1>
        <Link
          id="next-lesson"
          style={{ visibility: props.lesson >= (props.lessonData && props.lessonData.lessonNum) ? "hidden" : "" }}
          to={`/${props.course}/${props.chapter}/${Number(props.lesson) + 1}`}
        >
          {"Next >"}
        </Link>
      </div>

      <div id="speedrun-desc">
        <div id="textbox">
          <div id="content">
            <p id="lesson-desc">{props.lessonData && props.lessonData.lesson && props.lessonData.lesson.description}</p>
          </div>
          <div id="side-area">
            <div id="retry" onClick={reset}>
              Retry
            </div>
            <div id="timer-area">
              {completed ? (
                <img src={clockImgGreen} id="timer-icon" alt="" />
              ) : (
                <img src={clockImgBlue} id="timer-icon" alt="" />
              )}
              <p id="time">
                {mins}:{secs}:{frac}
              </p>
            </div>
          </div>
        </div>

        <div id="leaderboard">
          <h3>Leaderboard</h3>
          <div>
            {leaderboard &&
              leaderboard.map((e, i) => (
                <div className="leaderboard-entry" key={i}>
                  <div>{i + 1 + ". "}</div>
                  <div>{e.user}</div>
                  <div>{e.time + "ms"}</div>
                </div>
              ))}
          </div>
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
