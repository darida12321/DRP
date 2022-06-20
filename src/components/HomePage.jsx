import React from 'react';
import SubjectBox from './SubjectBox';
import NavBar from './NavBar';

import '../styles/homePage.css';
import MoonImg from '../images/moon-icon.svg';

function HomePage() {

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
            <SubjectBox link='/' subject='whatever' image={MoonImg} about='sussy'/>
          </div>
      </div>
    </div>
  );
}

export default HomePage;