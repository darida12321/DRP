import React from "react";
import { useEffect } from "react";

import { ui, uiConfig } from "../firebase";
// import "firebaseui/dist/firebaseui.css";
import "../styles/Signup.css";

function Signin() {
  useEffect(() => ui.start("#firebaseui-auth-container", uiConfig), []);

  return (
    <div>
      <h1 id="title"> Sign in </h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );
}

export default Signin;
