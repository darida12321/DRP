import React from "react";
import { Link } from "react-router-dom";

import gearImg from "../images/gear-icon.svg";
import houseImg from "../images/house-icon.svg";
import keyboardImg from "../images/keyboard-icon.svg";
import moonImg from "../images/moon-icon.svg";
import userImg from "../images/user-icon.svg";

import "../styles/NavBar.css";

function NavBar() {
  return (
    <nav id="nav-bar">
      <Link id="home" className="icon-box" to="/">
        <img src={houseImg} className="icon" alt="" />
      </Link>

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
        <div className="icon-box" to="">
          <img src={gearImg} className="icon" alt="" />
        </div>
        <Link className="icon-box" to="/signup">
          <img src={userImg} className="icon" alt="" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
