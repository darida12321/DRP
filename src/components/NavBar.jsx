import React from 'react';

import gearImg from '../images/gear-icon.svg'
import houseImg from '../images/house-icon.svg'
import keyboardImg from '../images/keyboard-icon.svg'
import moonImg from '../images/moon-icon.svg'
import userImg from '../images/user-icon.svg'

import '../styles/NavBar.css'

function NavBar() {
  return (
    <nav>
      <div>
        <img src={houseImg} className="icon" alt="" />
      </div>
      <div>
        <img src={keyboardImg} className="icon" alt="" />
        <h1>Website name</h1>
      </div>
      <div>
        <img src={moonImg} className="icon" alt="" />
        <img src={gearImg} className="icon" alt="" />
        <img src={userImg} className="icon" alt="" />
      </div>
    </nav>
  );
}

export default NavBar;