import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './mathInput.css';
import sendLatex from './handleAPI';
import MathOutput from '../MathOutput/mathOutput.js';
import Tabs from '../tabs/tabs.js';
import { processOutput } from '../MathOutput/processOutput.js';
import { MathField } from './field/field';
import { useAuthContext } from '../../../utils/context/authentication.js';

function MathInputField() {
  const { authState } = useAuthContext();
  const mathFieldRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isCopied1, setIsCopied1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [out, setOut] = useState({});
  const [fieldData, setFieldData] = useState({});

  const navigate = useNavigate();

  const { expression } = useParams();

  const encodedExpression = encodeURIComponent(fieldData.generalField);
  const decodedExpression = decodeURIComponent(expression);

  const [initialInput, setInitial] = useState(decodedExpression);

  const [selectedTabMode, setSelectedTabMode] = useState('radian');

  useEffect(() => {
    const timer = setInterval(() => {
      setIsCopied(false);
      setIsCopied1(false);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);



  const handleTabClick = (tab) => {
    setSelectedTabMode(tab);
  };

  const mode = "tex";


  const handleInputChange = (id, inputValue) => {
    setFieldData((prevData) => ({
      ...prevData,
      [id]: inputValue,
    }));
    setIsCopied(false);
    setIsCopied1(false);
  };


  const handleInitialExpression = () => {
    setIsLoading(true);
    sendLatex(mode === 'tex' ? initialInput : fieldData, handleApiResponse, selectedTabMode, authState);
  };

// Handle initial input
useEffect(() => {
  if (initialInput !== "undefined") {
    setFieldData({ generalField: initialInput });
    handleInitialExpression();
  }
}, [initialInput]);



  const handleEvaluateClick = () => {
    if(fieldData.generalField !== ""){
      setIsLoading(true);
      sendLatex(mode === 'tex' ? fieldData.generalField : fieldData, handleApiResponse, selectedTabMode, authState);
      // Update the URL with the current expression
      navigate(`/calculator/${encodedExpression}`);
    } else {
      navigate(`/calculator`);

    }
  };



  const handleApiResponse = (response) => {
    if(response !== true){
    const output = processOutput(response, mode);
    setIsLoading(false);
    setOut(output);
    }
    else if(response === true){
      setOut('Invalid')
    }
  };

  const handleCopyClick = () => {
    try {
      navigator.clipboard.writeText(out.solution.output);
      setIsCopied(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopyClick1 = () => {
    try {
      navigator.clipboard.writeText(out.solution.decimal);
      setIsCopied1(true);
    } catch (error) {
      console.log(error);
    }
  };

  const writeToMathField = (latex, strokes) => {
    if (mathFieldRef.current) {
      mathFieldRef.current.focus();
      mathFieldRef.current.write(latex);

      for (let i = 0; i < strokes; i++) {
        mathFieldRef.current.keystroke('Left');
      }
    }
  };

  return (
    <div className="calculator-content-holder-inside">
      <div className="calculator-tabs">
        <Tabs writeToMathField={writeToMathField} />
      </div>
      <div className='calculator-field-and-button'>
        <div className="calculator-input-field">
          <MathField
            id="generalField"
            onInputChange={handleInputChange}
            mathFieldRef={mathFieldRef}
            handleEvaluateClick={handleEvaluateClick}
            placeholder='Enter Expression'
            initialValue={initialInput}
          />
        </div>
        <div className='calculator-evaluate-button'>
          <button onClick={handleEvaluateClick}>Evaluate</button>
        </div>
      </div>
      <div className='mode-btns'>
          <button
            className={selectedTabMode === 'degree' ? 'selected-tab' : 'tab'}
            onClick={() => handleTabClick('degree')}
          >
            Deg
          </button>
          <button
            className={selectedTabMode === 'radian' ? 'selected-tab' : 'tab'}
            onClick={() => handleTabClick('radian')}
          >
            Rad
          </button>
        </div>
      <div className='solution-holder'>
        <MathOutput
          output={out}
          handleCopyClick={handleCopyClick}
          handleCopyClick1={handleCopyClick1}
          isCopied={isCopied}
          isCopied1={isCopied1}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default MathInputField;
