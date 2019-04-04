import React, { Component } from "react";
import "./Calculator.css";
import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      result: "000"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let input = this.state.input;
    console.log(e.target);

    if (e.target.classList.contains("clearBtn")) {
      return this.clear();
    }

    if (e.target.textContent <= 9 || e.target.textContent === ".") {
      input += e.target.textContent;
    } else if (e.target.textContent !== "" && e.target.textContent !== "=") {
      input += ` ${e.target.textContent} `;
    }

    if (e.target.textContent === "=") {
      return this.equals(input);
    }
    this.setState({ input: input });
  }

  clear() {
    this.setState({ input: "", result: 0 });
  }

  equals(input) {
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
