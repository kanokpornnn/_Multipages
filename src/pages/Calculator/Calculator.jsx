import React, { useState, useEffect } from "react";

import "./Calculator.css";

function Calculator() {
  const [displayvalue, setDisplayvalue] = useState(0);
  const [exp, setExp] = useState("");
  const [operatorp, setOperatorp] = useState(false);
  const [lNumber, setLNumber] = useState(0);
  const [lOperator, setLOperator] = useState("");
  const [lResult, setLResult] = useState(0);
  const [calculDone, setCalculDone] = useState(false);
  const [ctcalculator, setCtcalculator] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [exp, lOperator, lResult, lNumber, calculDone]);

  const checkEmpty = (inputValue) => {
    if (inputValue === "") {
      setDisplayvalue('0');
    }
  };

  const aNumber = (inputNumber) => {
    if (displayvalue === '0' || operatorp) {
      setDisplayvalue(inputNumber);
      setLOperator(false);
    } else {
      setDisplayvalue((prevvalue) => prevvalue + inputNumber);
    }
    setExp((prevvalue) => prevvalue + inputNumber);
    setLNumber(parseFloat(inputNumber))
    setCtcalculator(false);
  };

  const Operator = (inputOperator) => {
    if (calculDone) {
      setExp(lResult.toString())
      setCalculDone(false)

  }
  if (!isNaN(exp[exp.length - 1])) {
    setExp((prevvalue) => prevvalue + inputOperator);
    setLOperator(inputOperator);
    setOperatorp(true);
}

  setCtcalculator(false);}

  const Result = () => {
    const lastChar = exp[exp.length - 1];
    if (ctcalculator) {
        
    }else{setCtcalculator(true);

    }
    if (["+", "-", "*", "/", "%"].includes(lastChar)) {
        setDisplayvalue('Error')
        setExp('')
        setCalculDone(false)
        return
    }
    try{
        let result
        if (calculDone){
            result = eval(`${lResult} ${lOperator} ${lNumber}`)
        }else{
            result = eval(exp)
            setLNumber(parseFloat(exp.split(lOperator).pop()))
        }
        setDisplayvalue(result.toString())
        setExp(result.toString())
        setLResult(result)
        setCalculDone(true)
    }
    catch{
        setDisplayvalue('Error')
        setExp('')
        setCalculDone(false)
    }
}
    const cleardisplay = () => {
        setDisplayvalue('0');
        setExp("");
        setLOperator('');
        setLResult(0);
        setLNumber(0);
        setCalculDone(false);
        setCtcalculator(false);
        setOperatorp(false)
    }

    const deleteNumber = () => {
        if (calculDone) return 
        setDisplayvalue((prevvalue) => prevvalue.slice(0, -1));
        setExp((prevvalue) => prevvalue.slice(0, -1));
        setCtcalculator(false)
        setCalculDone(false)
        }   



  function handleKeydown(e) {
    if (e.key === "Enter") {
      Result();
    } else if (e.key === "Backspace") {
      deleteNumber();
    } else if (e.key === "Escape") {
      cleardisplay();
    } else if (!isNaN(e.key)) {
      aNumber(e.key);
    } else if (
      e.key === "+" ||
      e.key === "-" ||
      e.key === "*" ||
      e.key === "/" ||
      e.key === "%"
    ) {
      Operator(e.key);
    }
  }

  return (
    <div id="calculator">
      <input
        type="text"
        className="a"
        onBlur={() => checkEmpty(displayvalue)}
        value={displayvalue}
        readonly
      />
      <div id="b">
        <button className="btnC" onClick={()=>Operator("%")} >%</button>
        <button className="btnC" onClick={()=>Operator("/")}>÷</button>
        <button className="btnC" onClick={cleardisplay}>
          C
        </button>
        <button className="btnC" onClick={deleteNumber}>
          CE
        </button>
        <button className="btnC" onClick={()=>aNumber("7")}>7</button>
        <button className="btnC" onClick={()=>aNumber("8")}>8</button>
        <button className="btnC" onClick={()=>aNumber("9")}>9</button>
        <button className="btnC" onClick={()=>Operator("*")}>×</button>
        <button className="btnC" onClick={()=>aNumber("4")}>4</button>
        <button className="btnC" onClick={()=>aNumber("5")}>5</button>
        <button className="btnC" onClick={()=>aNumber("6")}>6</button>
        <button className="btnC" id="minus" onClick={()=>Operator("-")}>
          −
        </button>
        <button className="btnC" onClick={()=>aNumber("1")}>1</button>
        <button className="btnC" onClick={()=>aNumber("2")}>2</button>
        <button className="btnC" onClick={()=>aNumber("3")}>3</button>
        <button className="btnC" id="plus" onClick={()=>Operator("+")}>
          +
        </button>
        <button className="btnC" onClick={() => Result()}>=</button>
        <button className="btnC" onClick={()=>apendNumber("0")}>0</button>
        <button className="btnC" onClick={()=>apendNumber(".")}>.</button>
      </div>
    </div>
  );
}

export default Calculator;
