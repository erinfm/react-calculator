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
        <Button type="clearBtn">C</Button>
        <Button type="operator">÷</Button>
        <Button type="operator">×</Button>
        <Button> </Button>
      </div>
      <div className="calcRowBtn">
        <Button type="integer">1</Button>
        <Button type="integer">2</Button>
        <Button type="integer">3</Button>
        <Button type="operator">−</Button>
      </div>
      <div className="calcRowBtn">
        <Button type="integer">4</Button>
        <Button type="integer">5</Button>
        <Button type="integer">6</Button>
        <Button type="operator">+</Button>
      </div>
      <div className="calcRowBtn">
        <Button type="integer">7</Button>
        <Button type="integer">8</Button>
        <Button type="integer">9</Button>
        <Button type="operator">±</Button>
      </div>
      <div className="calcRowBtn">
        <Button> </Button>
        <Button type="integer">0</Button>
        <Button type="operator">.</Button>
        <Button type="operator">=</Button>
      </div>
    </div>
  );
};

export default Calculator;
