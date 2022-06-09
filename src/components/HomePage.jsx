import React from 'react';

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
          <button onClick = {startUpClicked}>Get Started</button>
        </div>
      </div>
      <div className = 'body'>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum exercitationem maxime magni impedit aperiam. Dolores et consectetur reiciendis velit hic sit, voluptatum consequatur necessitatibus cum laborum obcaecati aliquam exercitationem deserunt.</p>
      </div>
    </div>
  );
}

export default HomePage;