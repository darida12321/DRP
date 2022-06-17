import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLessonData } from "../firebase.js";

import NavBar from "./NavBar";
import ChapterView from "./ChapterView";
import LessonWindow from "./LessonWindow";
import PuzzleWindow from "./PuzzleWindow";

import "../styles/Tutorial.css";

function Tutorial() {
  const { chapter, lesson } = useParams();
  const [lessonData, setLessonData] = useState({})

  // Fetch the data when visiting page
  useEffect(() => {
    async function fetchData() {
      const lessonIndex = lesson - 1;
      const data = await getLessonData(chapter);
      const lessonData = data[lessonIndex];
      lessonData.lessonNum = data.length;
      setLessonData(lessonData);
    }
    fetchData();
  }, [chapter, lesson]);

  return (
    <>
      <NavBar />
      <div id="container">
        <ChapterView chapter={chapter} lesson={lesson} />
        {
        (lessonData.format === 'lesson')
        ? <LessonWindow chapter={chapter} lesson={lesson} lessonData={lessonData} />
        : <PuzzleWindow chapter={chapter} lesson={lesson} />
        }
      </div>
    </>
  );
}

export default Tutorial;
