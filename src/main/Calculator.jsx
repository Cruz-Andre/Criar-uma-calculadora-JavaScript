import React, { useState } from 'react';
import './Calculator.css';
import Button from '../components/Button/Button';
import Display from '../components/Display/Display';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  const clearMemory = () => {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperation(null);
    setValues([0, 0]);
    setCurrent(0);
  };

  const setDigit = (digit) => {
    if (digit === '.' && displayValue.includes('.')) {
      return;
    }

    const clear = displayValue === '0' || clearDisplay;
    const currentValue = clear ? '' : displayValue;
    const newDisplayValue = currentValue + digit;
    setDisplayValue(newDisplayValue);
    setClearDisplay(false);

    if (digit !== '.') {
      const newValue = parseFloat(newDisplayValue);
      const newValues = [...values];
      newValues[current] = newValue;
      setValues(newValues);
      console.log(newValues);
    }
  };

  const evaluateExpression = (operator, val1, val2) => {
    switch (operator) {
      case '+':
        return val1 + val2;
      case '-':
        return val1 - val2;
      case '*':
        return val1 * val2;
      case '/':
        return val1 / val2;
      default:
        return 0;
    }
  };

  const setOp = (operatorDigit) => {
    if (current === 0) {
      setCurrent(1);
      setClearDisplay(true);
      setOperation(operatorDigit);
    } else {
      const equals = operatorDigit === '=';
      const currentOp = operation;
      const newValues = [...values];
      newValues[0] = evaluateExpression(currentOp, values[0], values[1]);     
      newValues[1] = 0;
      setValues(newValues);
      setDisplayValue(newValues[0]);
      setOperation(equals ? null : operatorDigit);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(!equals);
    }
  };

  console.log(displayValue)

  return (
    <div className="calculator">
      <Display id='display' value={displayValue} />
      <Button id="clear" label="AC" click={clearMemory} triple />
      <Button id="divide" label="/" click={setOp} operation />
      <Button id="seven" label="7" click={setDigit} />
      <Button id="eight" label="8" click={setDigit} />
      <Button id="nine" label="9" click={setDigit} />
      <Button id="multiply" label="*" click={setOp} operation />
      <Button id="four" label="4" click={setDigit} />
      <Button id="five" label="5" click={setDigit} />
      <Button id="six" label="6" click={setDigit} />
      <Button id="subtract" label="-" click={setOp} operation />
      <Button id="one" label="1" click={setDigit} />
      <Button id="two" label="2" click={setDigit} />
      <Button id="three" label="3" click={setDigit} />
      <Button id="add" label="+" click={setOp} operation />
      <Button id="zero" label="0" click={setDigit} double />
      <Button id="decimal" label="." click={setDigit} />
      <Button id="equals" label="=" click={setOp} operation />
    </div>
  );
};

export default Calculator;
