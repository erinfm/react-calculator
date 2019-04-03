import React from "react";
import "./Calculator.css";
import Input from "./Input";
import Button from "./Button";

const Calculator = () => {
  return (
    <div className="calcContainer">
      <div className="calcRowInput">
        <Input input={"input field"} />
      </div>
      <div className="calcRowBtn">
        <Button>C</Button>
        <Button>÷</Button>
        <Button>×</Button>
        <Button> </Button>
      </div>
      <div className="calcRowBtn">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>−</Button>
      </div>
      <div className="calcRowBtn">
        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
        <Button>+</Button>
      </div>
      <div className="calcRowBtn">
        <Button>7</Button>
        <Button>8</Button>
        <Button>9</Button>
        <Button>±</Button>
      </div>
      <div className="calcRowBtn">
        <Button> </Button>
        <Button>0</Button>
        <Button>.</Button>
        <Button>=</Button>
      </div>
    </div>
  );
};

export default Calculator;
