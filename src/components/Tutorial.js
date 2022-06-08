import React from 'react'
import { useParams } from 'react-router-dom'

import NavBar from './NavBar'
import ChapterView from './ChapterView'
import TutorialWindow from './TutorialWindow'

function Tutorial() {
  const { chapter, lesson } = useParams();
  console.log(chapter, lesson)

  return (
    <div className="container">
      <NavBar />
      <ChapterView />
      <TutorialWindow />
    </div>
  );
}

export default Tutorial;