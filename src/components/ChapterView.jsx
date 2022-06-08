import React from 'react';

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