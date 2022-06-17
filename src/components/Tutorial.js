import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "./NavBar";
import ChapterView from "./ChapterView";
import LessonWindow from "./LessonWindow";
import PuzzleWindow from "./PuzzleWindow";

import "../styles/Tutorial.css";

function Tutorial() {
  const { chapter, lesson } = useParams();

  return (
    <>
      <NavBar />
      <div id="container">
        <ChapterView chapter={chapter} lesson={lesson}/>
        {
        <LessonWindow chapter={chapter} lesson={lesson} />
        //<PuzzleWindow chapter={chapter} lesson={lesson} />
        }
      </div>
    </>
  );
}

export default Tutorial;
