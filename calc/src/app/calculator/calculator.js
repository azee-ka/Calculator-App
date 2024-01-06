import React, { useRef } from 'react';
import './calculator.css';

import Tabs from './tabs/tabs';
import MathInputField from './MathInput/mathInput';
import MathOutput from './MathOutput/mathOutput';

function Calculator() {
  const mathFieldRef = useRef(null);

  return (
    <div className="calculator-container">
      <div className="calculator-title">QuantaLab</div>
      <div className="calculator-holder">
        <div className="calculator-sidebar-holder"></div>
        <div className="calculator-content-holder">
          <MathInputField mathFieldRef={mathFieldRef} />
        </div>
      </div>
    </div>
  );
}

export default Calculator;