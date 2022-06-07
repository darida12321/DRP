import React from 'react';
import img from './images/user-icon.svg'

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <div className="g0 box"></div>
      <div className="g1 box"></div>
      <div className="g2 box"></div>
      <div className="g3 box"></div>
      <div className="g4 box"></div>
      <img src={img} alt="user"/>
    </div>
  );
}

export default App;
