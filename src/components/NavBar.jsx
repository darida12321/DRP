import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../firebase";

import gearImg from "../images/gear-icon.svg";
import houseImg from "../images/house-icon.svg";
import keyboardImg from "../images/keyboard-icon.svg";
import moonImg from "../images/moon-icon.svg";
import userImg from "../images/user-icon.svg";

import "../styles/NavBar.css";

function NavBar() {
  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setSignedIn(window.localStorage.getItem("signedIn"));
    setUserData(JSON.parse(window.localStorage.getItem("userData")));
  }, []);

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
        {(() => {
          if (signedIn) {
            return (
              <div className="dropdown">
                <span>{userData.displayName}</span>
                <div className="dropdown-content">
                  <Link
                    to=""
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            );
          } else {
            return (
              <Link className="icon-box" to="/signin">
                <img src={userImg} className="icon" alt="" />
              </Link>
            );
          }
        })()}
      </div>
    </nav>
  );
}

export default NavBar;
