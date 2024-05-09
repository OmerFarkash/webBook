import "./profile.css";
import LeftBar from "../../Components/LeftBar/LeftBar.js";
import NavBar from "../../Components/NavBar/NavBar.js";
import UserContext from "../../UserContext.js";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReqList from "../../Components/ReqList/ReqList.js";
import FriendList from "../../Components/FriendList/FriendList.js";
import { ReactComponent as Edit } from "../../Components/Post/Icons/pencil.svg";
import { ReactComponent as Delete } from "../../Components/Post/Icons/trash.svg";
import {
  deleteFriendReq,
  deleteUser,
  editUser,
  postFriendReq,
} from "../../API/userApi.js";
import { fetchProfilePosts } from "../../API/postApi.js";
import Post from "../../Components/Post/Post.js";
import ProfileContext from "../../ProfileContext.js";

const Profile = () => {
  const activeUser = useContext(UserContext);
  const { setActiveUser } = useContext(UserContext);
  const profileUser = useContext(ProfileContext);
  const user = profileUser.profileUser;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(activeUser.activeUser);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (activeUser.activeUser.token === "") {
      navigate("/");
    }
  }, [activeUser, navigate]);

  useEffect(() => {
    if((activeUser.activeUser.friends.includes(user.username) || activeUser.activeUser.username === user.username)){
      async function fetchData() {
      let postList = await fetchProfilePosts(
        activeUser.activeUser.token,
        user.username
      );
      setPosts(JSON.parse(postList));
    }
    fetchData();
    }
    
  }, [posts.length]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
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

  async function handleDelete() {
    if (window.confirm("Are you sure?") === true) {
      await deleteUser(activeUser.activeUser);
    }
  }

  const FriendBtn = () => {
    const handleDeleteReq = async () => {
      return await deleteFriendReq(activeUser.activeUser.token, user.username);
    };

    const handleSendReq = async () => {
      return await postFriendReq(activeUser.activeUser.token, user.username);
    };

    const friends = activeUser.activeUser.friends;
    if (user.username === activeUser.activeUser.username) {
      return <></>;
    }
    //if user is a friend of activeUser
    else if (friends.includes(user.username)) {
      return (
        <div>
          <button id="friendReqBtn" onClick={handleDeleteReq}>
            Remove to friends
          </button>
        </div>
      );
    }
    //if user is not a friend
    else {
      return (
        <div>
          <button id="friendReqBtn" onClick={handleSendReq}>
            Add to friends
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <NavBar user={user} />
      <LeftBar />
      <ReqList activeUser={activeUser} />
      <div className="profile">
        <div className="page">
          <div className="container">
          {activeUser.activeUser.username === user.username &&
                !isEditing && (
                  <div classname="profileMenu">
                    <div className="item">
                      <Edit onClick={() => setIsEditing(true)} />
                    </div>
                    <div className="item">
                      <Delete onClick={handleDelete} />
                    </div>
                  </div>
                )}
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
                  <img className="ProfilePic" src={user.profilePic} alt="" />
                  <div className="details">
                    <span className="name">{user.name}</span>
                  </div>
                </>
              )}
              <FriendBtn />
            </div>
            
            <div className="Friends">
              {activeUser.activeUser.friends.length > 0 ? (
                <FriendList activeUser={activeUser} user={user} />
              ) : (
                <></>
              )}
            </div>
            <div classname="Posts">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  activeUser={activeUser.activeUser}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
