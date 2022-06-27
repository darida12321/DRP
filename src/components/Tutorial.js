import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLessonData } from "../firebase.js";

import NavBar from "./NavBar";
import ChapterView from "./ChapterView";
import LessonWindow from "./LessonWindow";
import PuzzleWindow from "./PuzzleWindow";
import SpeedrunWindow from "./SpeedrunWindow";
import ArtWindow from "./ArtWindow";

import "../styles/Tutorial.css";

function Tutorial() {
  const { course, chapter, lesson } = useParams();
  const [lessonData, setLessonData] = useState({});
  const [signedIn, setSignedIn] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setSignedIn(window.localStorage.getItem("signedIn"));
    setUserData(JSON.parse(window.localStorage.getItem("userData")));
  }, []);


  // Fetch the data when visiting page
  useEffect(() => {
    async function fetchData() {
      const lessonIndex = lesson - 1;
      const data = await getLessonData(course, chapter);
      const lessonData = data[lessonIndex];
      lessonData.lessonNum = data.length;
      lessonData.lessonCurr = lesson;
      setLessonData(lessonData);
    }
    fetchData();
  }, [course, chapter, lesson]);

  return (
    <>
      <NavBar />
      <div id="container">
        <ChapterView course={course} chapter={chapter} lesson={lesson} signedIn={signedIn} userData={userData} />
        {lessonData.format === "lesson" ? (
          <LessonWindow course={course} chapter={chapter} lesson={lesson} lessonData={lessonData} setUserData={setUserData} />
        ) : lessonData.format === "puzzle" ? (
          <PuzzleWindow course={course} chapter={chapter} lesson={lesson} lessonData={lessonData} />
        ) : lessonData.format === "speedrun" ? (
          <SpeedrunWindow course={course} chapter={chapter} lesson={lesson} lessonData={lessonData} />
        ) : lessonData.format === "art" ? (
          <ArtWindow course={course} chapter={chapter} lesson={lesson} lessonData={lessonData} />
        ) : null}
      </div>
    </>
  );
}

export default Tutorial;
