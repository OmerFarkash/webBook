import "./profile.css";
import LeftBar from "../../Components/LeftBar/LeftBar.js";
import NavBar from "../../Components/NavBar/NavBar.js";
import UserContext from "../../UserContext.js";
import React, { useEffect, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReqList from "../../Components/ReqList/ReqList.js";
import FriendList from "../../Components/FriendList/FriendList.js";
import { ReactComponent as Edit } from "../../Components/Post/Icons/pencil.svg";
import { editUser } from "../../API/userApi.js";

const Profile = ({user}) => {
  const activeUser = useContext(UserContext);
  const { setActiveUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(activeUser.activeUser);
  console.log(activeUser.activeUser.username , user.username)

  useEffect(() => {
    if (activeUser.activeUser.token == "") {
      navigate("/");
    }
  }, [activeUser, navigate]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log(editedUser)
    editUser(editedUser);
    setActiveUser(editedUser);
    setIsEditing(false);
  };

  //showing the image while in editing mode
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedUser({ ...editedUser, profilePic: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const FriendBtn = () => {
    // if (user.username === activeUser.username) {
    //   return;
    // }
    // //if user is a friend of activeUser
    // else if (user == friend) {
    //   return (
    //     <div>
    //       {/* onClick={deleteFriendReq(activeUser, user)} */}
    //       <button id="friendReqBtn" >Remove to friends</button>
    //     </div>
    //   );
    // }
    // //if user is not a friend
    // else {
    //   return (
    //     <div>
    //       {/* onClick={PostFriendReq(activeUser.token, user)} */}
    //       <button id="friendReqBtn" >Add to friends</button>
    //     </div>
    //   );
    // }
    return <button id="friendReqBtn">Add to friends</button>;
  };

  return (
    <div>
      <NavBar user={user} />
      <LeftBar />
      <ReqList activeUser={activeUser} />
      <div className="profile">
        <div className="page">
          <div className="container">
            <div className="user">
              <div className="userInfo">
                {isEditing ? (
                  <form onSubmit={handleEditSubmit}>
                    <input
                      value={editedUser.name}
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, name: e.target.value })
                      }
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <>
                    <img src={user.profilePic} alt="" />
                    <div className="details">
                      <span className="name">{user.name}</span>
                    </div>
                  </>
                )}

                {activeUser.activeUser.username === user.username && !isEditing && (
                  <div className="item">
                    <Edit onClick={() => setIsEditing(true)} />
                  </div>
                )}
                <FriendBtn />
              </div>
            </div>
            <div className="Friends">
              {(activeUser.activeUser.friends.length > 0)? <FriendList activeUser={activeUser} user={user} /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
