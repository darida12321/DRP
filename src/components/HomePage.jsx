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
        <h1>Website Name</h1>
      </div>
      <div className = 'body'>
        <div className = 'bodyContent'>
          <h2>Content</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum exercitationem maxime magni impedit aperiam. Dolores et consectetur reiciendis velit hic sit, voluptatum consequatur necessitatibus cum laborum obcaecati aliquam exercitationem deserunt.</p>
        </div>
      </div>
      <div className='courses'>
        <h1>Try our Free Courses!</h1>
          <div className='tutorialBoxes'>
            { courses && courses.map((e, i) => (
              <SubjectBox key={i} link={e.link} subject={e.subject} image={e.image} about={e.about}/>
            ))}
          </div>
      </div>
    </div>
  );
}

export default HomePage;