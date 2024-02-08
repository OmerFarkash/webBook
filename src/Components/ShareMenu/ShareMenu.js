import './shareMenu.css'
import { ReactComponent as Facebook } from "./Icons/facebook.svg";
import { ReactComponent as Instagram } from "./Icons/instagram.svg";
import { ReactComponent as Twitter } from "./Icons/twitter.svg";


const ShareMenu = () => {
  return (
    <div className="ShareMenu">
      <div className="card">
        <div className="Menu">
        <span><Facebook /></span>
        <span><Instagram /></span>
        <span><Twitter /></span> 
        </div>
      </div>
    </div>
  );
};

export default ShareMenu;
