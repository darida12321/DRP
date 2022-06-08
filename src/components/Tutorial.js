import React from 'react'

import NavBar from './NavBar'
import ChapterView from './ChapterView'
import TutorialWindow from './TutorialWindow'

function Tutorial() {
  return (
    <div class="container">
      <NavBar />
      <ChapterView />
      <TutorialWindow />
    </div>
  );
}

export default Tutorial;