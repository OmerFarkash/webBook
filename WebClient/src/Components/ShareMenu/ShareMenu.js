import "./shareMenu.css";
import { ReactComponent as Facebook } from "./Icons/facebook.svg";
import { ReactComponent as Instagram } from "./Icons/instagram.svg";
import { ReactComponent as Twitter } from "./Icons/twitter.svg";

const ShareMenu = () => {
  return (
    <div className="ShareMenu">
      <div className="card">
        <div className="Menu">
          <p>
            <Facebook />
          </p>
          <p>
            <Instagram />
          </p>
          <p>
            <Twitter />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareMenu;
