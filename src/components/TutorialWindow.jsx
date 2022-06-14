import React, { useEffect, useRef, useState } from "react";
import { getLessonData } from "../firebase.js";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/keybinding-vim";
import ace from "ace-builds/src-noconflict/ace";
import CodeChecker from "../js/CodeChecker";

import "../styles/TutorialWindow.css";

function TutorialWindow(props) {
  const [lesson, setLesson] = useState({});
  const [exampleNum, setExampleNum] = useState(0);
  const [complete, setComplete] = useState(false);
  var codeChecker = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const lessonIndex = props.lesson - 1;
      // Get lessons for chapter 1
      const data = await getLessonData(props.chapter);
      const lessonData = data[lessonIndex];
      setLesson({
        num: lessonData.num,
        title: lessonData.title,
        description: lessonData.description,
        exampleCount: lessonData.examples.length,
      });

      codeChecker.current = new CodeChecker(ace.edit("editor"), data[0].examples, () => {
        console.log("Lesson done!!!");
        setComplete(true);
      });
    }
    fetchData();
  }, [props.chapter, props.lesson]);

  // Get style variables from style.css
  var style = getComputedStyle(document.body);
  const boxShadowDefault = style.getPropertyValue("--blue-0");
  const boxShadowComplete = style.getPropertyValue("--green-2");

  var editing = false;
  function onChange(newContent) {
    if (editing) {
      return;
    }
    editing = true;
    var currentPosition = ace.edit("editor").selection.getCursor();
    const edited = newContent.replace("\t", "    ");
    ace.edit("editor").setValue(edited);
    ace.edit("editor").clearSelection();
    ace.edit("editor").moveCursorTo(currentPosition.row, currentPosition.column);
    editing = false;
  }

  function onCursorChange(selection) {
    if (editing || !codeChecker.current) {
      return;
    }
    setExampleNum(codeChecker.current.codeUpdated());
  }

  // style={{ boxShadow: "inset 20px 0" + (complete ? boxShadowComplete : boxShadowDefault) }}

  return (
    <div id="tutorial">
      <div id="textbox">
        <div id="lesson-info">
          <h1 id="lesson-title">
            Lesson {lesson.num}: {lesson.title}
          </h1>
          <p id="lesson-desc">{lesson.description}</p>
        </div>
        <div id="lesson-marker">
          <div id="blob" style={{ background: complete ? boxShadowComplete : boxShadowDefault }}>
            {exampleNum}/{lesson.exampleCount}
          </div>
        </div>
      </div>
      <AceEditor
        id="editor"
        mode="java"
        theme="chaos"
        name="editor"
        keyboardHandler="vim"
        style={{ width: "65rem", height: " 20rem" }}
        fontSize={"1.5vw"}
        showPrintMargin={false}
        onChange={onChange}
        onCursorChange={onCursorChange}
      />
    </div>
  );
}

export default TutorialWindow;
