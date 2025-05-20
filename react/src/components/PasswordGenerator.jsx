import { useContext, useEffect } from "react";
import { PasswordContext } from "../context/PasswordContext";

export default function PasswordGenerator() {
  const { password, strength, options, generatePassword, updateOptions, copyToClipboard } = useContext(PasswordContext);
  
  const handleOptionChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      updateOptions({ ...options, [name]: checked });
    } else if (type === "range") {
      updateOptions({ ...options, [name]: parseInt(value) });
    }
    generatePassword();
  }

  return (
    <div className="password-generator">
      <h1>Password Generator</h1>
      
      <div className="password-display">
        <input 
          type="text" 
          value={password} 
          readOnly 
          className="password-input" 
          placeholder="Your password will appear here"
        />
        <button 
          onClick={copyToClipboard} 
          className="copy-button"
          disabled={!password}
        >
          Copy
        </button>
      </div>
      
      <div className="strength-indicator">
        <div className="strength-label">
          Strength: {strength.description}
        </div>
        <div className="strength-bar">
          <div 
            className="strength-value" 
            style={{ width: `${strength.value}%`, backgroundColor: 
              strength.value <= 20 ? "red" :
              strength.value <= 40 ? "orange" :
              strength.value <= 60 ? "yellow" :
              strength.value <= 80 ? "yellowgreen" : "green"
            }}
          ></div>
        </div>
      </div>
      
      <div className="options">
        <div className="option">
          <label>Password Length: {options.length}</label>
          <input 
            type="range" 
            name="length"
            min="8" 
            max="64" 
            value={options.length}
            onChange={handleOptionChange}
          />
        </div>

        <div className="option">
          <input 
            type="checkbox" 
            name="uppercase"
            checked={options.uppercase}
            onChange={handleOptionChange}
            id="uppercase"
          />
          <label htmlFor="uppercase">Include Uppercase</label>
        </div>

        <div className="option">
          <input 
            type="checkbox" 
            name="lowercase"
            checked={options.lowercase}
            onChange={handleOptionChange}
            id="lowercase"
          />
          <label htmlFor="lowercase">Include Lowercase</label>
        </div>

        <div className="option">
          <input 
            type="checkbox" 
            name="specialLetters"
            checked={options.specialLetters}
            onChange={handleOptionChange}
            id="specialLetters"
          />
          <label htmlFor="specialLetters">Include Special Letters (áéíóú...)</label>
        </div>

        <div className="option">
          <input 
            type="checkbox" 
            name="numbers"
            checked={options.numbers}
            onChange={handleOptionChange}
            id="numbers"
          />
          <label htmlFor="numbers">Include Numbers</label>
        </div>

        <div className="option">
          <input 
            type="checkbox" 
            name="symbols"
            checked={options.symbols}
            onChange={handleOptionChange}
            id="symbols"
          />
          <label htmlFor="symbols">Include Symbols</label>
        </div>
      </div>
      
      <button 
        onClick={generatePassword} 
        className="generate-button"
      >
        Generate Password
      </button>
    </div>
  );
}