
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-chaos";
import ace from "ace-builds/src-noconflict/ace";

import "ace-builds/src-noconflict/ext-language_tools";
// All keybindings
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-emacs";
import "ace-builds/src-noconflict/keybinding-sublime";
import "ace-builds/src-noconflict/keybinding-vscode";
// All used highlightings
import "ace-builds/src-noconflict/mode-java";

// props:
// - lessonData: data for the lesson used
function PuzzleCodeEditor(props) {
  const [checkResult, setCheckResult] = useState(false)


  // Check if a key is allowed to be pressed
  useEffect(() => {
    function filterKeypress(e){
      if(Object.keys(props.lessonData).length === 0){
        return
      }
      if(e.key === 'Enter' && (e.shiftKey || e.ctrlKey || e.altKey)){
        if(e.altKey){
          const editor = ace.edit('editor')
          const init = props.lessonData.puzzle.init
          editor.setValue(init.code.replace('\\n', '\n'));
          editor.moveCursorTo(init.cLine, init.cPos);
          editor.session.selection.clearSelection();
        }
        return;
      }
      const setup = props.lessonData.lesson.editorSetup
      const included = setup.selectedKeys.includes(e.key)
      if(included ^ !setup.keyWhitelist){
        e.preventDefault()
        e.stopPropagation()
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

  // Always keep focus on the editor
  useEffect(() => {
    const textInput = ace.edit('editor').textInput.getElement()
    textInput.focus()
  }, [])

  // Set up the editor settings
  useEffect(() => {
    if(Object.keys(props.lessonData).length === 0){
      return
    }
    const editor = ace.edit('editor')

    const init = props.lessonData.puzzle.init
    editor.setValue(init.code.replace('\\n', '\n'));
    editor.moveCursorTo(init.cLine, init.cPos);
    editor.session.selection.clearSelection();
    
    const setup = props.lessonData.lesson.editorSetup
    editor.setKeyboardHandler('ace/keyboard/' + setup.editorMode)
    editor.session.setMode('ace/mode/' + setup.editorLanguage)
    editor.setDisplayIndentGuides(false)

    // Disable mouse input
    // TODO: migrate this to CodeEditor and disable them on return
    if(!setup.mouseInput){
        editor.on('mousedown', (e) => e.stop())
        editor.on('dblclick', (e) => e.stop())
        editor.on('tripleclick', (e) => e.stop())
        editor.on('quadclick', (e) => e.stop())
        editor.on('click', (e) => e.stop())
        editor.on('mousemove', (e) => e.stop())
        editor.container.addEventListener('contextmenu', (e) => {
            e.preventDefault()
        })
    }

    // Set the tab stop
    editor.setOptions({
        useSoftTabs: true,
        navigateWithinSoftTabs: true
    })

    setCheckResult(true)
  }, [props.lessonData])

  function onChange() {
    if(!checkResult){
      return;
    }
    if(!props.completed){
      props.setKeypresses(props.keypresses+1)
    }
    const code = ace.edit('editor').getValue();
    const cursor = ace.edit('editor').getCursorPosition();
    const state = { 
      code: code, 
      cLine: cursor.row, 
      cPos: cursor.column 
    };
    const expected = props.lessonData.puzzle.expected
    if(state.code === expected.code.replace('\\n', '\n')
      && state.cLine === parseInt(expected.cLine)
      && state.cPos === parseInt(expected.cPos)){
      if(props.keypresses < props.lessonData.puzzle.moves){
        props.setCompleted(true)
      }
    }
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
    onCursorChange={onChange}
    />
  )
}

export default PuzzleCodeEditor;