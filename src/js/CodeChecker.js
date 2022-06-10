
// Check code from an ace editor
export default class CodeChecker {
  // Constructor defining the parameters
  constructor(editor, examples, callback) {
    this.editor = editor;

    this.examples = examples;
    this.exampleNum = 0;
    this.exampleCount = examples.length;

    this.callback = callback;

    this.setEditorState(examples[0].initial)
  }

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

    return state.code === expected.code 
        && state.cLine === expected.cLine 
        && state.cPos === expected.cPos
  }

  // Call this when the code has updated
  codeUpdated() {
    if (this.goalReached()) {
      this.startNextExample();
    }
    return this.exampleNum;
  }

  // Move on to the next example
  startNextExample() {
    if (this.exampleNum >= this.exampleCount) {
      return;
    }
    this.exampleNum += 1;
    if (this.exampleNum < this.exampleCount) {
      this.setEditorState(this.examples[this.exampleNum].initial)
    } else {
      this.callback();
    }
  }
}
