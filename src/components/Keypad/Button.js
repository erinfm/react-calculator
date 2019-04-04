import React from "react";
import "./Button.css";

const Button = props => {
  console.log(props);
  return <div className={`buttonStyle ${props.type}`}>{props.children}</div>;
};

export default Button;
