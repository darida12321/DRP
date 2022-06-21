import React from "react";

//import { ui, uiConfig } from "../firebase";
//import "firebaseui/dist/firebaseui.css";

export default function Signup() {
  return (
    <div>
      <h1> signup </h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );
}

//ui.start("#firebaseui-auth-container", uiConfig);
