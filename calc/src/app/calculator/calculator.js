import React, { useRef } from 'react';
import './calculator.css';
import MathInputField from './MathInput/mathInput';

function Calculator() {
  const mathFieldRef = useRef(null);

  return (
    <div className="calculator-container">
      <div className="calculator-title">QuantaLab</div>
      <div className="calculator-holder">
        <div className="calculator-sidebar-holder">
          <div className="calculator-sidebar-holder-inner">

          </div>
        </div>
        <div className="calculator-content-holder">
          <div className="calculator-content-holder-inner">
            <div className="calculator-content-holder-inner-sub">
            <MathInputField mathFieldRef={mathFieldRef} />
            </div>
             
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;