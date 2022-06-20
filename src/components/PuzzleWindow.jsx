import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/PuzzleWindow.css";
import PuzzleCodeEditor from "./PuzzleCodeEditor";

function PuzzleWindow(props) {
  const [keypresses, setKeypresses] = useState(0)
  const [solutionVisible, setSolutionVisible] = useState(false)
  const navigate = useNavigate();

  // Set up the next lesson shortcut once examples are complete
  useEffect(() => {
    function shortcutHandler(e) {
      if (Object.keys(props.lessonData).length === 0) {
        return;
      }
      if (e.key === "Enter" && e.shiftKey 
          && props.lesson < props.lessonData.lessonNum) {
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
  }, [props.lessonData, props, navigate]);

  const moves = props.lessonData.puzzle ? props.lessonData.puzzle.moves : 1
  const ratio = Math.min(keypresses/moves, 1)

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
          <div id="keystroke-bar">
            <div id="keystroke-amount-bar"
            style={
              {width: ratio*100+'%'}}></div>
            <p>{keypresses}/{props.lessonData.puzzle && props.lessonData.puzzle.moves}</p>
          </div>
        </div>
        <div id="solution-area">
          <div id="solution-label"
            onClick={() => {setSolutionVisible(!solutionVisible)}}>
            <p>Solution</p>
            <div id="arrow"
              style={{transform: solutionVisible 
                ? 'translate(0, 0.2rem) rotate(-135deg)'
                : 'translate(0, -0.2rem) rotate(45deg)'
              }}
            ></div>
          </div>
          <div id="solution" 
            style={{visibility: solutionVisible ? 'visible' : 'hidden'}}>
            WWbj
          </div>
        </div>
      </div>

      <PuzzleCodeEditor lessonData={props.lessonData} setKeypresses={setKeypresses}/>

    </div>
  );
}

export default PuzzleWindow;
