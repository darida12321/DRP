import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/SubjectBox.css';

// used properties
// - link: link to start of chapter
// - subject: title of editor the course will teach you
// - about: short description of editor
// - image: image of this editor's logo
function SubjectBox(props) {
  return (
    <div className='subject'>
      <div className='subjectHeader'>
        <p>{props.subject}</p>
      </div>
      <div className='subjectBody'>
        <div className='info'>
          <img src={props.image} alt=''/>
          <div className='infoText'>
            <p>{props.about}</p>
          </div>
        </div>
        <div className = 'getStarted'>
          <Link to={props.link}>
            <button onClick = {() => {}}>
              <p>Get Started</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SubjectBox;