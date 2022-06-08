import React from 'react';

// TODO make this return data from server
function getLessonData() {
  return {
    chapter: 1,
    title: 'Basic Motions',
    lessons: [
      'Introduction to Vim',
      'Moving a Word Forward',
      'Moving a Word Backward',
      'word v. Word',
      'Move to the end of word',
      'Final Test'
    ],
  }
}

function ChapterView() {
  return (
    <div className="chapter">
      <h1>Chapter 1:</h1>
      <h3>Basic motions</h3>
      <div>
        <div>
          <div className="lesson-marker"></div>
          <p>Introduction to vim</p>
        </div>
        <div>
          <div className="lesson-marker"></div>
          <p>Moving a word forward</p>
        </div>
        <div>
          <div className="lesson-marker"></div>
          <p>Moving a word backward</p>
        </div>
        <div>
          <div className="lesson-marker"></div>
          <p>WORD vs. word</p>
        </div>
        <div>
          <div className="lesson-marker"></div>
          <p>Move to end of word</p>
        </div>
        <div>
          <div className="lesson-marker"></div>
          <p>Final test</p>
        </div>
      </div>
    </div>
  );
}

export default ChapterView;