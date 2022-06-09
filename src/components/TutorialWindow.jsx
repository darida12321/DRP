import React from 'react';

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
      num: 3,
      title: 'Moving one word back',
      desc: 'Use \'b\' to move the cursor back one word.',
    },
    initial: {
      code: 'int addNumbers(int a, int b){\n\treturn a+b;\n}',
      cLine: 0,
      cPos: 15
    }
  };
}

function TutorialWindow() {
  const [lesson, setLesson] = React.useState({});

  React.useEffect(() => {
    const data = getLessonData();
    setLesson(data.lesson);
    
    ace.edit('editor').setValue(data.initial.code)
    ace.edit('editor').moveCursorTo(data.initial.cLine, data.initial.cPos);
    ace.edit('editor').session.selection.clearSelection()
  }, []);

  return (
    <div className="tutorial">
      <div className="textbox">
        <div>
          <h1>Lesson {lesson.num}: {lesson.title}</h1>
          <p>{lesson.desc}</p>
        </div>
        <div>
          <div className="marker">
            1/5
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
        />
    </div>
  );
}

export default TutorialWindow;