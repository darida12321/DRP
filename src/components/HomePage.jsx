import React from 'react';

function signUpClicked() {
  console.log('pressed sign up button');
}

function signInClicked() {
  console.log('pressed sign in button');
}

function HomePage() {
  return (
    <div className = "main">
      <div className="banner">
        <h1>Website Name</h1>
        <div className = "loginBoxes">
          <button onClick = {signUpClicked}>Sign Up</button>
          <button onClick = {signInClicked}>Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;