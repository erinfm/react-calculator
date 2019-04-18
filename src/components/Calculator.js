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
    this.lastNumber = "";
    this.isNewCalculation = false;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let input = this.state.input;
    console.log(input);

    if (e.target.classList.contains("clearBtn")) {
      return this.clearAll();
    }

    if (e.target.classList.contains("backarrow")) {
      return this.clearLast(input);
    }

    if (e.target.classList.contains("equals")) {
      // Ensures function only runs if last character in input is a number"
      const lastChar = input.slice(-1);
      if (lastChar !== " " && lastChar !== "-" && lastChar !== ".")
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

    if (e.target.classList.contains("plusminus")) {
      if (this.currentNumber === "" && input[input.length - 1] !== "-") {
        input += "-";
      }
    }

    if (e.target.classList.contains("operator") && this.currentNumber) {
      if (this.isNewCalculation) {
        input = `${this.state.result} ${e.target.textContent} `;
        this.lastNumber = this.currentNumber;
        this.currentNumber = "";
        this.isNewCalculation = false;
      } else {
        input += ` ${e.target.textContent} `;
        this.lastNumber = this.currentNumber;
        this.currentNumber = "";
      }
    }

    this.setState({ input: input });
  }

  clearAll() {
    this.currentNumber = "";
    this.isNewCalculation = false;
    this.setState({ input: "", result: 0 });
  }

  clearLast(input) {
    console.log("clearing");
    let lastInputRemoved = "";
    let newCurrentInput = "";

    if (input[input.length - 1] === " ") {
      lastInputRemoved = input.substring(0, input - 3);
      newCurrentInput = input.substring(0, input.length - 3);

      this.currentNumber = this.lastNumber;
    } else {
      lastInputRemoved = this.currentNumber.substring(
        0,
        this.currentNumber.length - 1
      );

      newCurrentInput = input.substring(0, input.length - 1);

      this.currentNumber = lastInputRemoved;
    }

    this.setState({ input: newCurrentInput });
  }

  equals(input) {
    //replace occurences of "x" and "÷" with "*" and "/"
    const editedInput = input
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-");

    const evalResult = eval(editedInput);

    if (evalResult === undefined) {
      return;
    }

    const result = Number.isInteger(evalResult)
      ? evalResult
      : evalResult.toFixed(3);

    this.isNewCalculation = true;
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
