import { useState } from "react";
import './regInput.css';

const RegInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;  
  
  const handlefocus = (e) => {
    setFocused(true);
  };

  return (
    <div class="input-group">
      {/* <label>{label}</label> */}
        <input
          {...inputProps}
          onChange={onChange} 
          onBlur={handlefocus} 
          onFocus={() =>
            inputProps.name === "passwordConfirmation" && setFocused(true)
          }
          focused={focused.toString()}/>
        <span>{errorMessage}</span>
    </div>
  );
};

export default RegInput;