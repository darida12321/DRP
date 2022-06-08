import React, { useEffect } from 'react';

import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'

function onChange(newValue) {
  console.log('Editor changed', newValue)
}

// TODO fetch data from a backend
function getLessonData() {
  return{
    id: 3,
    title: 'Moving one word back',
    desc: 'Use \'b\' to move the cursor back one word.',
  };
}

function TutorialWindow() {
  const [lesson, setLesson] = React.useState({});

  React.useEffect(() => {
    setLesson(getLessonData());
  }, []);

  return (
    <div className="tutorial">
      <div className="textbox">
        <div>
          <h1>Lesson {lesson.id}: {lesson.title}</h1>
          <p>{lesson.desc}</p>
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
  );
}

export default TutorialWindow;