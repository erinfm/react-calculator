import React from "react";
import Button from "./Button";
import "./Keypad.css";

const Keypad = props => {
  return (
    <div className="calcKeypad">
      <div className="calcRowBtn">
        <Button onClick={props.onClick} name="clear" type="noninteger clearBtn">
          C
        </Button>
        <Button onClick={props.onClick} name="/" type="noninteger operator">
          ÷
        </Button>
        <Button onClick={props.onClick} name="*" type="noninteger operator">
          ×
        </Button>
        <Button type="disabled"> </Button>
      </div>
      <div className="calcRowBtn">
        <Button onClick={props.onClick} name="1" type="integer">
          1
        </Button>
        <Button onClick={props.onClick} name="2" type="integer">
          2
        </Button>
        <Button onClick={props.onClick} name="3" type="integer">
          3
        </Button>
        <Button onClick={props.onClick} name="-" type="noninteger operator">
          −
        </Button>
      </div>
      <div className="calcRowBtn">
        <Button onClick={props.onClick} name="4" type="integer">
          4
        </Button>
        <Button onClick={props.onClick} name="5" type="integer">
          5
        </Button>
        <Button onClick={props.onClick} name="6" type="integer">
          6
        </Button>
        <Button onClick={props.onClick} name="+" type="noninteger operator">
          +
        </Button>
      </div>
      <div className="calcRowBtn">
        <Button onClick={props.onClick} name="7" type="integer">
          7
        </Button>
        <Button onClick={props.onClick} name="8" type="integer">
          8
        </Button>
        <Button onClick={props.onClick} name="9" type="integer">
          9
        </Button>
        <Button
          onClick={props.onClick}
          name="plusminus"
          type="noninteger plusminus"
        >
          ±
        </Button>
      </div>
      <div className="calcRowBtn">
        <Button type="disabled"> </Button>
        <Button onClick={props.onClick} name="0" type="integer">
          0
        </Button>
        <Button onClick={props.onClick} name="." type="noninteger decimal">
          .
        </Button>
        <Button onClick={props.onClick} name="equals" type="noninteger equals">
          =
        </Button>
      </div>
    </div>
  );
};

export default Keypad;
