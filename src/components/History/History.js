import React, { Component } from "react";
import "./History.css";

const History = props => {
  console.log(props);
  const listItems = props.list.map(i => <p key={i[0]}>{i[1]}</p>);

  const width = window.innerWidth;
  if (width <= 500) {
    return (
      <div
        className={
          props.visibility ? "historyStyle visible" : "historyStyle invisible"
        }
      >
        <div id="closeHistory" onClick={props.toggle}>
          &#10006;
        </div>
        <div id="listItems">{listItems}</div>
      </div>
    );
  } else
    return (
      <div
        className={
          props.visibility ? "historyStyle visible" : "historyStyle invisible"
        }
      >
        <div id="listItems">{listItems}</div>
      </div>
    );
};

export default History;
