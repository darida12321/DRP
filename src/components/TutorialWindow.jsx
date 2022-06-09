import React, { useEffect, useRef } from "react";
import { db } from "../firebase.js";
import { collection, doc, getDoc, addDoc, setDoc, getDocs } from "firebase/firestore";

import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-chaos'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/keybinding-vim'
import ace from 'ace-builds/src-noconflict/ace'

// TODO fetch data from a backend
function getLessonData() {
  return{
    lesson: {
      num: 1,
      title: 'Moving with hjkl',
      desc: 'Use the h,j,k and l keys to move around.\n\'h\'-left, \'j\'-down, \'k\'-up, \'l\'- right',
      exampleCount: 2
    },
    examples: [
      {
        initial: {
          code: '                  |\n  Move here: > <  |\n                  |',
          cLine: 0,
          cPos: 0
        },
        expected: {
          cLine: 1,
          cPos: 14
        }
      },
      {
        initial: {
          code: '  Now here: > <   |\n                  |\n                  |',
          cLine: 1,
          cPos: 13
        },
        expected: {
          cLine: 0,
          cPos: 13
        }
      }
    ]
  };
}

class CodeChecker {
  constructor(exampleCount){
    this.editor = null
    this.desiredState = null
    this.examples = []
    this.exampleNum = 0
    this.exampleCount = exampleCount
    this.callback = null
  }

  setEditor(editor){
    this.editor = editor
  }

  setEditorState(state){
    this.editor.setValue(state.code)
    this.editor.moveCursorTo(state.cLine, state.cPos);
    this.editor.session.selection.clearSelection()
  }

  setExamples(examples){
    this.examples = examples
  }

  setDesiredState(desired){
    this.desiredState = desired
  }

  setCallback(f){
    this.callback = f
  }

  getEditorState(){
    if(!this.editor){ return null }
    const code = this.editor.getValue()
    const cursor = this.editor.getCursorPosition()
    return { code: code, line: cursor.row, pos: cursor.column }
  }

  goalReached() {
    if(this.desiredState === null){ return false; }
    const state = this.getEditorState()

    return (state.line === this.desiredState.line &&
            state.pos  === this.desiredState.pos)
  }

  codeUpdated() {
    if(this.callback && this.goalReached()){
      this.incrementExample()
    }
    return this.exampleNum
  }

  incrementExample() {
    console.log('Done example', this.exampleNum+1, this.exampleCount)
    this.exampleNum += 1;
    if(this.exampleNum < this.exampleCount){
      this.setEditorState({
        code: this.examples[this.exampleNum].initial.code,
        cLine: this.examples[this.exampleNum].initial.cLine,
        cPos: this.examples[this.exampleNum].initial.cPos
      })
      this.setDesiredState({
        line: this.examples[this.exampleNum].expected.cLine,
        pos: this.examples[this.exampleNum].expected.cPos
      })
    } else {
      this.callback()
    }
  }
}

function TutorialWindow() {
  const [lesson, setLesson] = React.useState({})
  const [exampleNum, setExampleNum] = React.useState(0)
  var codeChecker = useRef(null)

  React.useEffect(() => {
    const data = getLessonData()
    setLesson(data.lesson)
    codeChecker.current = new CodeChecker(data.lesson.exampleCount)
    codeChecker.current.setEditor(ace.edit('editor'))
    codeChecker.current.setExamples(data.examples)
    
    codeChecker.current.setEditorState({
      code: data.examples[0].initial.code,
      cLine: data.examples[0].initial.cLine,
      cPos: data.examples[0].initial.cPos
    })

    codeChecker.current.setDesiredState({
      line: data.examples[0].expected.cLine,
      pos: data.examples[0].expected.cPos
    })

    codeChecker.current.setCallback(() => {
      console.log("Lesson done!!!!")
    })
  }, []);

  let complete = true;

  // Get style variables from style.css
  var style = getComputedStyle(document.body);
  const boxShadowDefault = style.getPropertyValue("--blue-0");
  const boxShadowComplete = style.getPropertyValue("--green-0");

  var editing = false;
  function onChange(newContent){
    if(editing){ return; }
    editing = true;
    var currentPosition = ace.edit('editor').selection.getCursor();
    const edited = newContent.replace("\t", "    ")
    ace.edit('editor').setValue(edited);
    ace.edit('editor').clearSelection()
    ace.edit('editor').moveCursorTo(currentPosition.row, currentPosition.column);
    editing = false;
  }

  function onCursorChange(selection){
    if(editing){ return; }
    setExampleNum(codeChecker.current.codeUpdated())
  }

  return (
    <div className="tutorial">
      <div
        className="textbox"
        style={{ boxShadow: "inset 20px 0" + (complete ? boxShadowDefault : boxShadowComplete) }}
      >
        <div>
          <h1>Lesson {lesson.num}: {lesson.title}</h1>
          <p>{lesson.desc}</p>
        </div>
        <div>
          <div className="marker">
            {exampleNum}/{lesson.exampleCount}
          </div>
        </div>
      </div>
        <AceEditor
          id='editor'
          mode='java'
          theme='chaos'
          name='editor'
          keyboardHandler='vim'
          style={{width: '80rem', height: '100%'}}
          fontSize={20}
          showPrintMargin={false}
          onChange={onChange}
          onCursorChange={onCursorChange}
        />
    </div>
  );
}

export default TutorialWindow;
