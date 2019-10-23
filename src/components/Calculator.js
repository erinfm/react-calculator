import React, { Component } from "react";
import "./Calculator.css";
import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";
import History from "./History/History";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      result: "0",
      historyVisibility: false
    };
    this.currentNumber = "";
    this.lastNumber = "";
    this.isNewCalculation = false;
    this.handleClick = this.handleClick.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  handleClick(e) {
    let input = this.state.input;
    const elementClasses = e.target.classList;

    if (elementClasses.contains("clearBtn")) {
      return this.clearAll();
    }

    if (elementClasses.contains("backarrow")) {
      if (this.isNewCalculation) return;
      return this.clearLast(input);
    }

    if (elementClasses.contains("equals")) {
      // Ensures function only runs if last character in input is a number"
      if (this.currentNumber.includes("(")) this.currentNumber += ")";

      // Ensures function only runs if parentheses are balanced
      let depth = 0;
      for (let i of input) {
        if (i === "(") depth += 1;
        if (i === ")") depth -= 1;
      }

      if (
        depth === 0 &&
        input[input.length - 1] !== "-" &&
        input[input.length - 1] !== " " &&
        input[input.length - 1] !== "." &&
        input[input.length - 1] !== "("
      ) {
        return this.equals(input);
      }
    }

    if (
      elementClasses.contains("integer") &&
      this.isNewCalculation !== true &&
      input[input.length - 1] !== ")"
    ) {
      input += e.target.textContent;
      this.currentNumber += e.target.textContent;
    }

    if (
      elementClasses.contains("brackets") &&
      this.isNewCalculation !== true &&
      input[input.length - 1] !== "."
    ) {
      if (
        this.currentNumber &&
        !isNaN(input[input.length - 1]) &&
        input.includes("(")
      ) {
        this.lastNumber = this.currentNumber;
        this.currentNumber += ")";
        input += ")";
      } else if (input[input.length - 1] === ")") {
        this.currentNumber += ")";
        input += ")";
      } else if (
        input[input.length - 1] === "(" ||
        input[input.length - 1] === " " ||
        input.length === 0
      ) {
        this.currentNumber += "(";
        input += "(";
      }
    }

    if (
      elementClasses.contains("decimal") &&
      input[input.length - 1] !== ")" &&
      !this.currentNumber.includes(".")
    ) {
      input += e.target.textContent;
      this.currentNumber += e.target.textContent;
    }

    if (elementClasses.contains("plusminus")) {
      if (this.currentNumber === "" && input[input.length - 1] !== "-") {
        input += "-";
      }
    }

    if (
      elementClasses.contains("operator") &&
      this.currentNumber &&
      this.currentNumber !== "(" &&
      input[input.length - 1] !== "."
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
      return;
    }

    if (evalResult === undefined || evalResult === "") {
      return;
    }

    const editedEval = Number.isInteger(evalResult)
      ? evalResult
      : evalResult.toFixed(6);

    const result = parseFloat(editedEval);
    this.isNewCalculation = true;

    // Run addToHistory() once result state has been updated
    this.setState({ result }, () => {
      this.addToHistory();
    });
  }

  toggleVisibility(e) {
    this.setState({
      visibility: !this.state.visibility
    });
  }

  addToHistory() {
    const newItem = [`${this.state.input} = ${this.state.result}`];

    const list = localStorage.getItem("list") || "";

    // Convert list from localStorage from string into array, to make adding new item and checking length easier
    const listArray = list.split(",");

    listArray.push(newItem);

    // Limits history list to last 15 calculations
    if (listArray.length > 15) {
      listArray.shift();
    }

    // Convert back to string and remove initial ","
    let listString = listArray.join(",");

    if (listString[0] === ",") {
      listString = listString.substring(1);
    }

    localStorage.setItem("list", listString);
  }

  render() {
    return (
      <div>
        <div className="calcContainer">
          <Screen input={this.state.input} result={this.state.result} />
          <Keypad onClick={this.handleClick} />
          <p id="prevCalc" onClick={this.toggleVisibility}>
            {this.state.visibility
              ? `Previous Calculations  ✖`
              : `Previous Calculations ↓`}
          </p>
        </div>
        <History
          visibility={this.state.visibility}
          toggle={this.toggleVisibility}
        />
      </div>
    );
  }
}

export default Calculator;
