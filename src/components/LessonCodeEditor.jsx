
import React, { useEffect, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-chaos";
import ace from "ace-builds/src-noconflict/ace";
import CodeChecker from "../js/CodeChecker";

// props:
// - lessonData: data for the lesson used
// - setExampleNum: callback function for changing example
function LessonCodeEditor(props) {
  var codeChecker = useRef(null);

  // Check if a key is allowed to be pressed
  useEffect(() => {
    function filterKeypress(e){
      if(Object.keys(props.lessonData).length === 0){
        return
      }
      const setup = props.lessonData.lesson.editorSetup
      if(e.key === 'Enter' && (e.shiftKey || e.ctrlKey)){
        return;
      }
      const included = setup.selectedKeys.includes(e.key)
      if(included ^ !setup.keyWhitelist){
        //e.preventDefault()
        //e.stopPropagation()
      }
    }
    ace.edit('editor').container
      .addEventListener('keydown', filterKeypress, true)
    return () => {
      if(!document.getElementById('editor')){
        return;
      }
      ace.edit('editor').container
        .removeEventListener('keydown', filterKeypress, true)
    }
  }, [props.lessonData])

  useEffect(() => {
    if(Object.keys(props.lessonData).length === 0){ return }
    codeChecker.current = new CodeChecker(
      ace.edit("editor"),
      props.lessonData.lesson.editorSetup,
      props.lessonData.examples,
      props.lessonData.sandbox,
      props.setExampleNum
    );
  }, [props.lessonData, props.setExampleNum]);

  // Always keep focus on the editor
  useEffect(() => {
    const textInput = ace.edit('editor').textInput.getElement()
    textInput.focus()
    textInput.addEventListener('focusout', (e) => {
      textInput.focus()
    })
  })

  function onChange() {
    if (!codeChecker.current) {
      return;
    }
    codeChecker.current.onChange();
  }

  function onCursorChange() {
    if (!codeChecker.current) {
      return;
    }
    codeChecker.current.onCursorChange();
  }

  return (
    <AceEditor
    id="editor"
    mode="text"
    theme="chaos"
    name="editor"
    keyboardHandler="vim"
    style={{ width: "80%", height: "100%" }}
    fontSize={"1.5vw"}
    showPrintMargin={false}
    onChange={onChange}
    onCursorChange={onCursorChange}
    />
  )
}

export default LessonCodeEditor;