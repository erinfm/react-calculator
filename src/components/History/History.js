import React from "react";
import "./History.css";

const History = props => {
  const listItems = props.list.map(i => <p key={i[0]}>{i[1]}</p>);

  return (
    <div
      className={
        props.visibility ? "historyStyle visible" : "historyStyle invisible"
      }
    >
      {listItems}
    </div>
  );
};

export default History;
