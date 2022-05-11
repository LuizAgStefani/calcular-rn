import { useState } from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import Button from "./src/components/Button";
import Display from "./src/components/Display";

export default function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  const addDigit = (n) => {
    const clearDisplayVal = displayValue === "0" || clearDisplay;

    if (n === "." && displayValue.includes(".")) {
      return;
    }

    const currentValue = clearDisplayVal ? "" : displayValue;

    let displayValueVar = currentValue + n;

    setDisplayValue(displayValueVar);
    setClearDisplay(false);

    if (n !== ".") {
      const newValue = parseFloat(displayValueVar);
      const newValues = [...values];
      newValues[current] = newValue;
      setValues(newValues);
    }
  };

  const clearMemory = () => {
    setDisplayValue("0");
    setClearDisplay(false);
    setOperation(null);
    setValues([0, 0]);
    setCurrent(0);
  };

  const setOp = (op) => {
    if (current === 0) {
      setOperation(op);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = op === "=";

      const calcValues = values;

      try {
        calcValues[0] = eval(`${calcValues[0]} ${operation} ${calcValues[1]}`);
      } catch (error) {
        calcValues[0] = values[0];
      }

      calcValues[1] = 0;
      setDisplayValue(`${calcValues[0]}`);
      setOperation(equals ? null : op);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(!equals);
      setValues(calcValues);
    }
  };

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label={"AC"} triple onClick={clearMemory} />
        <Button label={"/"} opButton onClick={setOp} />
        <Button label={"7"} onClick={addDigit} />
        <Button label={"8"} onClick={addDigit} />
        <Button label={"9"} onClick={addDigit} />
        <Button label={"*"} opButton onClick={setOp} />
        <Button label={"4"} onClick={addDigit} />
        <Button label={"5"} onClick={addDigit} />
        <Button label={"6"} onClick={addDigit} />
        <Button label={"-"} opButton onClick={setOp} />
        <Button label={"1"} onClick={addDigit} />
        <Button label={"2"} onClick={addDigit} />
        <Button label={"3"} onClick={addDigit} />
        <Button label={"+"} opButton onClick={setOp} />
        <Button label={"0"} double onClick={addDigit} />
        <Button label={"."} onClick={addDigit} />
        <Button label={"="} opButton onClick={setOp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
