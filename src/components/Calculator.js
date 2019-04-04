import React from "react";
import "./Calculator.css";
import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";

const Calculator = () => {
  return (
    <div className="calcContainer">
      <Screen />
      <Keypad />
    </div>
  );
};

export default Calculator;
