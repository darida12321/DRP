import React from 'react';
import SubjectBox from './SubjectBox';
import NavBar from './NavBar';

import '../styles/homePage.css';
import { useEffect } from 'react';
import { getCourseData } from '../firebase';

const images = require.context("../images", true);

const buildObj = (data) => {
  return {
    subject: data.title,
    link: (`/${data.id}/1/1`),
    about: data.about,
    image: images(`./${data.image}`),
    unavailable: data.unavailable,
  }
}

function HomePage() {

  let [courses, setCourses] = React.useState();

  useEffect(() => {
    async function getData() {
      let remoteCourses = await getCourseData();
      setCourses(remoteCourses.map(buildObj));
    }
    getData();
  }, []);

  return (
    <div className = "main">
      <NavBar/>
      <div className = "banner">
        <h1>Shortcutter</h1>
      </div>
      <div className = 'body'>
        <div className = 'bodyContent'>
          <h2>About Us!</h2>
          <p>Shortcutter is a project made by 3 people with a single purpose: helping the average person learn keyboard shortcuts for their editor of choice! <br/><br/> Whether you're an experienced developer, a budding author, or a stressed-out student who needs to get better at Excel, we have your back. Our simple, intuitive, and expertly-crafted lessons will turn you into an editing wizard.</p>
        </div>
      </div>
      <div className='courses'>
        <h1>Try our Free Courses!</h1>
          <div className='tutorialBoxes'>
            { courses && courses.map((e, i) => (
              <SubjectBox key={i} link={e.link} subject={e.subject} image={e.image} about={e.about} unavailable={e.unavailable}/>
            ))}
          </div>
      </div>
    </div>
  );
}

export default HomePage;