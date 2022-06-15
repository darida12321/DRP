
import "ace-builds/src-noconflict/ext-language_tools";
// All keybindings
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-emacs";
import "ace-builds/src-noconflict/keybinding-sublime";
import "ace-builds/src-noconflict/keybinding-vscode";
// All used highlightings
import "ace-builds/src-noconflict/mode-java";

// Check code from an ace editor
export default class CodeChecker {
  // Constructor defining the parameters
  constructor(editor, editorSetup, examples, setExampleNum) {
    this.editor = editor;

    this.checking = editorSetup.checking
    this.initializeEditor(editorSetup)

    this.examples = examples;
    this.exampleNum = 0;
    this.exampleCount = examples.length;

    this.setExampleNum = setExampleNum;

    this.setEditorState(examples[0].initial)
    // Focus on the element
    this.editor.textInput.getElement().focus()
  }

  /* INITIALIZE ACE EDITOR */
  // The main initialization function
  initializeEditor(setup){
    this.editor.setKeyboardHandler('ace/keyboard/' + setup.editorMode)
    this.editor.session.setMode('ace/mode/' + setup.editorLanguage)

    // Disable mouse input
    if(!setup.mouseInput){
        this.editor.on('mousedown', (e) => e.stop())
        this.editor.on('dblclick', (e) => e.stop())
        this.editor.on('tripleclick', (e) => e.stop())
        this.editor.on('quadclick', (e) => e.stop())
        this.editor.on('click', (e) => e.stop())
        this.editor.on('mousemove', (e) => e.stop())
        this.editor.container.addEventListener('contextmenu', (e) => {
            e.preventDefault()
        })
    }

    // Limit keyboard input
    //this.editor.container.addEventListener('keydown', (e) => {
      //if(e.key === 'Enter' && e.shiftKey){
        //return;
      //}
      //const included = setup.selectedKeys.includes(e.key)
      //if(included ^ !setup.keyWhitelist){
        //e.preventDefault()
        //e.stopPropagation()
      //}
    //}, true)

    // Set the tab stop
    this.editor.setOptions({
        useSoftTabs: true,
        navigateWithinSoftTabs: true
    })
  }

  onChange() {
    this.codeUpdated()
  }

  onCursorChange() {
    this.codeUpdated()
  }

  /* MONITOR THE STATE OF THE EXERCISE */
  // Set the state of the editor
  setEditorState(state) {
    this.editor.setValue(state.code);
    this.editor.moveCursorTo(state.cLine, state.cPos);
    this.editor.session.selection.clearSelection();
  }

  // Get the state of the editor
  getEditorState() {
    if (!this.editor) {
      return null;
    }
    const code = this.editor.getValue();
    const cursor = this.editor.getCursorPosition();
    return { code: code, cLine: cursor.row, cPos: cursor.column };
  }

  // Check if the current goal in the editor is reached
  goalReached() {
    if (this.exampleNum >= this.exampleCount){
      return false;
    }
    const state = this.getEditorState();
    const expected = this.examples[this.exampleNum].expected

    if(this.checking === 'cursor'){
        return state.cLine === expected.cLine 
            && state.cPos === expected.cPos
    } else {
        return state.code === expected.code 
    }
  }

  // Call this when the code has updated
  codeUpdated() {
    if (this.goalReached()) {
      this.startNextExample();
    }
    this.setExampleNum(this.exampleNum)
  }

  // Move on to the next example
  startNextExample() {
    if (this.exampleNum >= this.exampleCount) {
      return;
    }
    this.exampleNum += 1;
    if (this.exampleNum < this.exampleCount) {
      this.setEditorState(this.examples[this.exampleNum].initial)
    }
  }
}
