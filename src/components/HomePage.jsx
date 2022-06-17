import React from 'react';
import { Link } from 'react-router-dom';
import SubjectBox from './SubjectBox';

import '../styles/homePage.css';

function startUpClicked() {
  console.log('pressed start up button');
}

function HomePage() {

  return (
    <div className = "main">
      <div className = "banner">
        <h1>Website Name</h1>
        <div className = "loginBoxes">
          <Link to='/vim/1/1'>
            <button onClick = {startUpClicked}>
              <p>Get Started</p>
            </button>
          </Link>
        </div>
      </div>
      <div className = 'body'>
        <h2>Content</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum exercitationem maxime magni impedit aperiam. Dolores et consectetur reiciendis velit hic sit, voluptatum consequatur necessitatibus cum laborum obcaecati aliquam exercitationem deserunt.</p>
        <SubjectBox link='/' subject='whatever' img=''/>
      </div>
    </div>
  );
}

export default HomePage;