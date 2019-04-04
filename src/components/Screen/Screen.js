import React from "react";
import Input from "./Input";
import Result from "./Result";
import "./Screen.css";

const Screen = props => (
  <div className="calcScreen">
    <Input input={props.input} />
    <Result result={props.result} />
  </div>
);

export default Screen;
