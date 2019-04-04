import React, { Component } from "react";
import Input from "./Input";
import Result from "./Result";
import "./Screen.css";

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "23+2",
      result: "000"
    };
  }

  render() {
    return (
      <div className="calcScreen">
        <Input input={this.state.input} />
        <Result result={this.state.result} />
      </div>
    );
  }
}

export default Screen;
