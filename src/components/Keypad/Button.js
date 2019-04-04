import React from "react";
import "./Button.css";

const Button = props => {
  return (
    <div className={`buttonStyle ${props.type}`} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Button;
