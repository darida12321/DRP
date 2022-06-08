import React from 'react';

import gearImg from '../images/gear-icon.svg'
import houseImg from '../images/house-icon.svg'
import keyboardImg from '../images/keyboard-icon.svg'
import moonImg from '../images/moon-icon.svg'
import userImg from '../images/user-icon.svg'

const NavBar = () => {
  return (
    <nav>
      <div>
        <img src={houseImg} class="icon" alt="" />
      </div>
      <div>
        <img src={keyboardImg} class="icon" alt="" />
        <h1>Website name</h1>
      </div>
      <div>
        <img src={moonImg} class="icon" alt="" />
        <img src={gearImg} class="icon" alt="" />
        <img src={userImg} class="icon" alt="" />
      </div>
    </nav>
  );
}

export default NavBar;