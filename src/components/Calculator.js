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
      historyVisibility: false,
      list: []
    };
    this.currentNumber = "";
    this.lastNumber = "";
    this.isNewCalculation = false;
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentDidMount() {
    // Makes contents of localStorage display in History component
    const listObj = { ...localStorage };
    const list = Object.keys(listObj).map(key => [Number(key), listObj[key]]);

    // Remove last element from list array
    const popped = list.pop();

    this.setState({ list });
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
      e.target.classList.contains("decimal") &&
      input[input.length - 1] !== ")" &&
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

    if (
      e.target.classList.contains("operator") &&
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
    console.log(e);
    this.setState({
      visibility: !this.state.visibility
    });
  }

  getKey() {
    return this.keyCount++;
  }

  addToHistory() {
    console.log("added!");
    const newItem = [
      `${this.getKey()}`,
      `${this.state.input} = ${this.state.result}`
    ];

    const list = [...this.state.list];

    list.push(newItem);

    // Limits history list to last 15 calculations
    if (list.length > 15) {
      list.shift();
    }

    this.setState({
      list
    });

    localStorage.setItem(newItem[0], newItem[1]);
  }

  // saveToLocalStorage() {
  //   for (let i in this.state.list) {
  //     localStorage.setItem(i[0], i[1])
  //   }
  // }
  render() {
    return (
      <div>
        <div className="calcContainer">
          <Screen input={this.state.input} result={this.state.result} />
          <Keypad onClick={this.handleClick} />
          <p id="prevCalc" onClick={this.toggleVisibility}>
            Previous Calculations ↓
          </p>
        </div>
        <History visibility={this.state.visibility} list={this.state.list} />
      </div>
    );
  }
}

export default Calculator;
