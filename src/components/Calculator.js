import React, { Component } from "react";
import "./Calculator.css";
import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "23+2",
      result: "000"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let result = this.state.result;
    console.log(result);
    console.log(e);
  }

  render() {
    return (
      <div className="calcContainer">
        <Screen input={this.state.input} result={this.state.result} />
        <Keypad onClick={this.handleClick} />
      </div>
    );
  }
}

export default Calculator;
