import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/SubjectBox.css';

// used properties
// - link: link to start of chapter
// - subject: title of editor the course will teach you
// - image: image of this editor's logo
function SubjectBox(props) {
  return (
    <Link to={props.link}>
      <div className='subject'>
        <div className='subjectName'>
          <p>{props.subject}</p>
        </div>
        <img src={props.image} alt=''/>
      </div>
    </Link>
  );
}

export default SubjectBox;