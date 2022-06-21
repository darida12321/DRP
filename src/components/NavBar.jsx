import React from "react";

import gearImg from "../images/gear-icon.svg";
import houseImg from "../images/house-icon.svg";
import keyboardImg from "../images/keyboard-icon.svg";
import moonImg from "../images/moon-icon.svg";
import userImg from "../images/user-icon.svg";

import "../styles/NavBar.css";

function NavBar() {
  return (
    <nav id="nav-bar">
      <div id="home" className="icon-box">
        <img src={houseImg} className="icon" alt="" />
      </div>

      <div id="title">
        <div className="icon-box">
          <img src={keyboardImg} className="icon" alt="" />
        </div>
        <h1 id="name">Website name</h1>
      </div>
      
      <div id="menu">
        <div className="icon-box">
          <img src={moonImg} className="icon" alt="" />
        </div>
        <div className="icon-box">
          <img src={gearImg} className="icon" alt="" />
        </div>
        <div className="icon-box">
          <img src={userImg} className="icon" alt="" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
