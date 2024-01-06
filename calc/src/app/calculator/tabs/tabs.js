import React, { useState } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { symbols, greekLetters, upperGreekLetters, trig, linearAlgebra } from './mathButtons.js';
import './tabs.css';

const tabButtons = {
  tab1: {
    name: "Basic",
    buttons: symbols,
  },
  tab2: {
    name: "Greek Alphabet",
    buttons: greekLetters,
  },
  tab3: {
    name: "Calculus",
    buttons: upperGreekLetters,
  },
  tab4: {
    name: "Trig",
    buttons: trig,
  },
  // tab5: {
  //   name: "Linear Algebra",
  //   buttons: linearAlgebra,
  // },
};

const KaTeXButton = ({ label, value, writeToMathField }) => (
  <button className="calculator-button" onClick={() => writeToMathField(value)}>
    <InlineMath math={label} />
  </button>
);

const Tabs = ({ writeToMathField }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(tabButtons)[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="calculator-tab-buttons">
        {Object.entries(tabButtons).map(([tab, { name }]) => (
          <button
            key={tab}
            className={tab === activeTab ? 'active' : ''}
            onClick={() => handleTabClick(tab)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="calculator-tab-content">
      {tabButtons[activeTab].buttons && (
          <ul className="calculator-button-list">
            {Object.entries(tabButtons[activeTab].buttons).map(([label, [value, strokes]]) => (
              <li key={label}>
                <KaTeXButton
                  label={label}
                  value={value}
                  writeToMathField={() => {
                    writeToMathField(value, strokes);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
        {!tabButtons[activeTab].buttons && <p>No buttons available for this tab.</p>}
      </div>
    </div>
  );
};

export default Tabs;