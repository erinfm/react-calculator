import React, { Component } from "react";
import Header from "./components/Header";
import Calculator from "./components/Calculator";
import "./App.css";

class App extends Component {
  render() {
    let width = window.innerWidth;
    if (width <= 500) {
      return (
        <div className="App">
          <Calculator />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header />
          <Calculator />
        </div>
      );
    }
  }
}

export default App;
