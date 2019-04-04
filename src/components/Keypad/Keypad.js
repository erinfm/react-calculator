import React from "react";
import Button from "./Button";
import "./Keypad.css";

const Keypad = props => {
  console.log(props);
  return (
    <div className="calcKeypad">
      <div className="calcRowBtn">
        <Button name="clear" type="clearBtn">
          C
        </Button>
        <Button name="/" type="operator">
          ÷
        </Button>
        <Button name="*" type="operator">
          ×
        </Button>
        <Button> </Button>
      </div>
      <div className="calcRowBtn">
        <Button name="1" type="integer">
          1
        </Button>
        <Button name="2" type="integer">
          2
        </Button>
        <Button name="3" type="integer">
          3
        </Button>
        <Button name="-" type="operator">
          −
        </Button>
      </div>
      <div className="calcRowBtn">
        <Button name="4" type="integer">
          4
        </Button>
        <Button name="5" type="integer">
          5
        </Button>
        <Button name="6" type="integer">
          6
        </Button>
        <Button name="+" type="operator">
          +
        </Button>
      </div>
      <div className="calcRowBtn">
        <Button name="7" type="integer">
          7
        </Button>
        <Button name="8" type="integer">
          8
        </Button>
        <Button name="9" type="integer">
          9
        </Button>
        <Button name="tbc" type="operator">
          ±
        </Button>
      </div>
      <div className="calcRowBtn">
        <Button> </Button>
        <Button name="0" type="integer">
          0
        </Button>
        <Button name="." type="operator">
          .
        </Button>
        <Button name="equals" type="operator">
          =
        </Button>
      </div>
    </div>
  );
};

export default Keypad;
