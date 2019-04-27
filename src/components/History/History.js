import React, { Component } from "react";
import "./History.css";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = { list: "" };
    this.clearAll = this.clearAll.bind(this);
  }

  componentDidMount() {
    this.setState({ list: localStorage.getItem("list") }, () =>
      this.updateListItems()
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.list !== localStorage.getItem("list")) {
      this.setState({ list: localStorage.getItem("list") }, () =>
        this.updateListItems()
      );
    }
  }

  updateListItems() {
    if (this.state.list && this.state.list.length > 1) {
      this.listItems = this.state.list
        .split(",")
        .map((item, index) => <p key={index}>{item}</p>);
    } else {
      return;
    }
  }

  clearAll() {
    localStorage.clear();
    this.setState({ list: [] });
    this.listItems = [];
  }

  render() {
    if (this.state.list && this.state.list.length > 1) {
      this.updateListItems();
    }
    const width = window.innerWidth;
    if (width <= 500) {
      return (
        <div
          className={
            this.props.visibility
              ? "historyStyle visible"
              : "historyStyle invisible"
          }
        >
          <div id="closeHistory" onClick={this.props.toggle}>
            &#10006;
          </div>
          <div id="listItems">{this.listItems}</div>
          <p id="clearHistory" onClick={() => this.clearAll()}>
            Clear All
          </p>
        </div>
      );
    } else
      return (
        <div
          className={
            this.props.visibility
              ? "historyStyle visible"
              : "historyStyle invisible"
          }
        >
          <div id="listItems">{this.listItems}</div>
          <p id="clearHistory" onClick={() => this.clearAll()}>
            Clear All
          </p>
        </div>
      );
  }
}

export default History;
