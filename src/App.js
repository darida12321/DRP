import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'
import NavBar from './components/NavBar'
import ChapterSelect from './components/ChapterSelect'

function onChange(newValue) {
  console.log('Editor changed', newValue)
}

function App() {
  return (
    <div class="container">
      <NavBar />
      <ChapterSelect />
      <div className="tutorial">
        <div className="textbox">
          <div>
            <h1>Lesson 3: Moving a word backwards</h1>
            <p>Use b to go back an entire word.</p>
          </div>
          <div>
            <div className="marker">
              1/5
            </div>
          </div>
        </div>
        <div className="editor-container">
          <AceEditor
            mode='java'
            theme='github'
            onChange={onChange}
            name='editor'
          />
        </div>
      </div>
    </div>
  );
}

export default App;
