import React, { Component } from "react";
import Header from "./components/Header";
import Calculator from "./components/Calculator";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      windowWidth: window.innerWidth
    };
  }

  handleResize = e => {
    const newWidth = window.innerWidth;
    this.setState({
      windowWidth: newWidth
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const width = this.state.windowWidth;

    return (
      <div className="App">
        {width >= 500 && <Header />}
        <Calculator />
      </div>
    );
  }
}

export default App;
