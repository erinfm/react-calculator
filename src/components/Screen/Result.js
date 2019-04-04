import React from "react";
import "./Result.css";

const Result = props => {
  console.log(props);
  return <div className="resultStyle">{props.result}</div>;
};

export default Result;
