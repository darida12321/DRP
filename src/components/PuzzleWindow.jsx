import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import ace from "ace-builds/src-noconflict/ace";

import "../styles/PuzzleWindow.css";
import PuzzleCodeEditor from "./PuzzleCodeEditor";

function PuzzleWindow(props) {
  const [completed, setCompleted] = useState(false)
  const [keypresses, setKeypresses] = useState(0)
  const [solutionVisible, setSolutionVisible] = useState(false)
  const navigate = useNavigate();

  // Reset variables when prop updates
  useEffect(() => {
    setCompleted(false)
    setKeypresses(0)
    setSolutionVisible(false);
  }, [props])

  // Set up the next lesson shortcut once examples are complete
  useEffect(() => {
    function shortcutHandler(e) {
      if (Object.keys(props.lessonData).length === 0) {
        return;
      }
      if (e.key === 'Enter' && e.altKey){
        setCompleted(false)
        setKeypresses(0)
      }
      if (e.key === "Enter" && e.shiftKey 
          && props.lesson < props.lessonData.lessonNum) {
        const link = `/${props.course}/${props.chapter}/${Number(props.lesson) - 1}`;
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

  function reset() {
    const editor = ace.edit('editor')
    const init = props.lessonData.puzzle.init
    editor.setValue(init.code.replace('\\n', '\n'));
    editor.moveCursorTo(init.cLine, init.cPos);
    editor.session.selection.clearSelection();

    setCompleted(false)
    setKeypresses(0)


    const textInput = ace.edit('editor').textInput.getElement()
    textInput.focus()
  }

  // Get style variables from style.css
  var style = getComputedStyle(document.body);
  const cDefault = style.getPropertyValue("--blue-1");
  const cComplete = style.getPropertyValue("--green-1");
  const cError = style.getPropertyValue("--red-1");

  const moves = props.lessonData.puzzle ? props.lessonData.puzzle.moves : 1
  const ratio = Math.min(keypresses/moves, 1)
  const barColor = completed ? cComplete : 
    (keypresses < moves ? cDefault : cError) 

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
        <div id="content">
          <p id="lesson-desc">{props.lessonData && props.lessonData.lesson && props.lessonData.lesson.description}</p>
          <div id="keystroke-bar">
            <div id="keystroke-amount-bar"
            style={
              {width: ratio*100+'%',
              background: barColor}}></div>
            <p>{Math.min(keypresses, moves)}/{moves} moves</p>
          </div>
        </div>
        <div id="solution-area">
          <div id="retry"
            onClick={reset}
          >Retry</div>
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
            {props.lessonData.puzzle && props.lessonData.puzzle.solution}
          </div>
        </div>
      </div>

      <PuzzleCodeEditor 
        lessonData={props.lessonData} 
        keypresses={keypresses}
        setKeypresses={setKeypresses}
        completed={completed}
        setCompleted={setCompleted}
      />
    </div>
  );
}

export default PuzzleWindow;
