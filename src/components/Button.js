import React from "react";
import "./Button.css";

const Button = props => {
  return <div className="buttonStyle">{props.children}</div>;
};

export default Button;
