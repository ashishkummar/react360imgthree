import React, { Component } from "react";
import ReactDOM from "react-dom";
import View360Three from "./View360Three";

ReactDOM.render(
  <>
    <View360Three
      image="images/img1.jpg"
      autoRotate="true"
      width="480"
      height="270"
    />
    
    <View360Three
      image="images/img2.jpg"
      autoRotate="true"
      width="640"
      height="360"
    />
  </>,
  document.getElementById("root")
);
