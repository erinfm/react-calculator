import React from "react";
import "./History.css";

const History = props => {
  console.log(props);
  return (
    <div
      className={
        props.visibility ? "historyStyle visible" : "historyStyle invisible"
      }
    >
      <p>calculation history here</p>
    </div>
  );
};

export default History;
