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
      if (this.currentNumber.includes("(")) this.currentNumber += ")";
      if (
        input[input.length - 1] !== "-" &&
        input[input.length - 1] !== " " &&
        input[input.length - 1] !== "."
      ) {
        return this.equals(input);
      }
    }

    if (
      e.target.classList.contains("integer") &&
      this.isNewCalculation === false &&
      input[input.length - 1] !== ")"
    ) {
      console.log(this.currentNumber);
      input += e.target.textContent;
      this.currentNumber += e.target.textContent;
    }

    if (
      e.target.classList.contains("brackets") &&
      input[input.length - 1] !== "(" &&
      input[input.length - 1] !== ")" &&
      input[input.length - 1] !== "."
    ) {
      if (this.currentNumber) {
        console.log("brackets");
        this.lastNumber = this.currentNumber;
        this.currentNumber += ")";
        input += ")";
      } else {
        this.currentNumber += "(";
        input += "(";
      }
    }

    if (
      e.target.classList.contains("decimal") &&
      input[input.length - 1] !== ")" &&
      !this.currentNumber.includes(".")
      // &&
      // input[input.length - 1] !== "(" &&
      // input[input.length - 1] !== ")"
    ) {
      input += e.target.textContent;
      this.currentNumber += e.target.textContent;
    }

    if (e.target.classList.contains("plusminus")) {
      if (this.currentNumber === "" && input[input.length - 1] !== "-") {
        input += "-";
      }
    }

    if (
      e.target.classList.contains("operator") &&
      this.currentNumber &&
      this.currentNumber !== "("
    ) {
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
    let evalResult = "";
    //replace occurences of "x" and "÷" with "*" and "/"
    const editedInput = input
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-");

    try {
      evalResult = eval(editedInput);
    } catch (e) {
      // corrects input when unneccesary ")" has been placed at end
      if (e.message.includes(")")) {
        const correctedInput = editedInput.substring(0, editedInput.length - 1);
        evalResult = eval(correctedInput);
      }
    }

    if (evalResult === undefined || evalResult === "") {
      return;
    }

    const editedEval = Number.isInteger(evalResult)
      ? evalResult
      : evalResult.toFixed(6);

    const result = parseFloat(editedEval);
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
