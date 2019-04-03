import React, { Component } from "react";
import Header from "./components/Header";
import Calculator from "./components/Calculator";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Calculator />
      </div>
    );
  }
}

export default App;
