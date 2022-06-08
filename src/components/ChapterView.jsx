import React, { useEffect, useState } from 'react';

function ChapterView(props) {
  const [lessons, setLessons] = useState({})

  useEffect(() => {
    setLessons({
      chapter: 1,
      title: 'Basic Motions',
      lessons: [
        { id: 1, lesson: 'Introduction to Vim' },
        { id: 2, lesson: 'Moving a Word Forward' },
        { id: 3, lesson: 'Moving a Word Backward' },
        { id: 4, lesson: 'word v. Word' },
        { id: 5, lesson: 'Move to the end of word' },
        { id: 6, lesson: 'Final Test '}
      ]
    })
  }, [])

  return (
    <div className="chapter">
      <h1>Chapter {lessons.chapter && lessons.chapter}:</h1>
      <h3>{lessons.title && lessons.title}</h3>
      <div>
        {
          lessons.lessons && lessons.lessons.map((l) => (
            <div key={l.id}>
              <div className="lesson-marker"></div>
              <p>{l.lesson}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ChapterView;