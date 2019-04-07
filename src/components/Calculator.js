import React, { Component } from "react";
import "./Calculator.css";
import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      result: "0"
    };
    this.currentNumber = "";
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let input = this.state.input;

    if (e.target.classList.contains("clearBtn")) {
      return this.clear();
    }

    if (e.target.classList.contains("equals")) {
      return this.equals(input);
    }

    if (e.target.classList.contains("integer")) {
      input += e.target.textContent;
      this.currentNumber += e.target.textContent;
    }

    if (
      e.target.classList.contains("decimal") &&
      !this.currentNumber.includes(".")
    ) {
      input += e.target.textContent;
      this.currentNumber += e.target.textContent;
    }

    if (
      e.target.classList.contains("operator") &&
      input.length > 0 &&
      // Prevents operator at start of input
      !isNaN(input.charAt(input.length - 2))
    ) {
      input += ` ${e.target.textContent} `;
      this.currentNumber = "";
    }

    this.setState({ input: input });
  }

  clear() {
    this.currentNumber = "";
    this.setState({ input: "", result: 0 });
  }

  equals(input) {
    this.currentNumber = "";
    //replace occurences of "x" and "÷" with "*" and "/"
    const editedInput = input
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-");

    const evalResult = eval(editedInput);

    const result = Number.isInteger(evalResult)
      ? evalResult
      : evalResult.toFixed(3);

    this.setState({ result });
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
