import "./toggle.css";
import { ReactComponent as Dark } from "./Icons/moon.svg";

export const Toggle = ({ handleChange }) => {
  return (
    <div className="toggle">
      <Dark onClick={handleChange} />
    </div>
  );
};
