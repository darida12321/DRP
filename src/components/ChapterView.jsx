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
  const lesson = getLessonData();

  return (
    <div className="chapter">
      <h1>Chapter {lesson.chapter}:</h1>
      <h3>{lesson.title}</h3>
      <div>
        {
          lesson.lessons.map((l) => (
            <div>
              <div className="lesson-marker"></div>
              <p>{l}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ChapterView;