// 1. Import React Object model
import React from "react";
// 2. Import ReactDOM for rendering React Component in DOM
import ReactDom from "react-dom";
// 3. Import bootstrap
import "!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css";
import StudentAppComponent from './classcomponents/studentcomponent/studentappcomponent';
import SimpleComponent from "./components/simpleComponent.jsx";
import StudentComponent from "./classcomponents/studentcomponent/studentcomponent.jsx";
import ObjectHookComponent from "./hooks/ObjectHookComponent";
ReactDom.render(<ObjectHookComponent/>, document.getElementById("app"))