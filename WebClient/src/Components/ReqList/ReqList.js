import "./reqList.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as Accept } from "./Icons/check.svg";
import { ReactComponent as Reject } from "./Icons/x.svg";
import { useHistory } from "react-router-dom";

const ReqList = ({ activeUser }) => {
  const navigate = useNavigate();
  const history = useHistory();

  const [reqList, setReqList] = useState([]);
  // let list = fetchFriendReq(activeUser.token);
  // setReqList(list);

  function handleClick({ user }) {
    history.push(`/User/${user.username}`, (user = { user }));
  }

  const acceptReq = () => {
    // add friend to activeUser friends list + delete request from list
  };

  const rejectReq = () => {
    // delete request from list
  };

  const FriendReq = ({ user }) => {
    return (
      <div className="FriendReq">
        <div className="container">
          <div className="user" onClick={handleClick({ user })}>
            <img src="{user.profilePic}" alt="" />
            <span className="name">user.name</span>
          </div>
          <div className="options">
            <button onClick={acceptReq}>
              <Accept />
            </button>
            <button onClick={rejectReq}>
              <Reject />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ReqList">
      <div className="container">
        <div className="item">
          <FriendReq />
        </div>
        <div className="item">
          <FriendReq />
        </div>
        {reqList.map((user) => (
          <FriendReq user={user} />
        ))}
      </div>
    </div>
  );
};
export default ReqList;
