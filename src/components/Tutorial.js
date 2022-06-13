import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "./NavBar";
import ChapterView from "./ChapterView";
import TutorialWindow from "./TutorialWindow";

import "../styles/Tutorial.css";

function Tutorial() {
  const { chapter, lesson } = useParams();

  return (
    <div id="container">
      <NavBar />
      <ChapterView chapter={chapter} />
      <TutorialWindow chapter={chapter} lesson={lesson} />
    </div>
  );
}

export default Tutorial;
