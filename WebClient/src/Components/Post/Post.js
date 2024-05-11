import "./post.css";
import { useState, useEffect, useContext } from "react";
import { ReactComponent as Liked } from "./Icons/liked.svg";
import { ReactComponent as NotLiked } from "./Icons/notLiked.svg";
import { ReactComponent as ShareIcon } from "./Icons/share.svg";
import { ReactComponent as CommentsIcon } from "./Icons/comments.svg";
import Comments from "../Comments/Comments";
import ShareMenu from "../ShareMenu/ShareMenu";
import { ReactComponent as Edit } from "./Icons/pencil.svg";
import { ReactComponent as Trash } from "./Icons/trash.svg";
import { likePost, editPost, deletePost } from "../../API/postApi";
import { Link, useNavigate } from "react-router-dom";
import ProfileContext from "../../ProfileContext";
import { fetchUser } from "../../API/userApi";

const Post = ({ post, activeUser }) => {
  const [isLiked, setIsLiked] = useState(
    post.likes.includes(activeUser.username)
  );
  const [shareOpen, setShareOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const { setProfileUser } = useContext(ProfileContext);
  const navigate = useNavigate();

  //handeling the submition of the edited post
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editPost(activeUser.token, editedPost); 
    setIsEditing(false);
  };

  //showing the image while in editing mode
  const handleFileChange = (e) => {
    setEditedPost({ ...editedPost, postPic: URL.createObjectURL(e.target.files[0]) });
  };

  //like post
  async function handleLike() {
    setIsLiked(!isLiked);
    await likePost(activeUser.token, post);
  }

  //delete post
  async function handleDelete() {
    if (window.confirm("Are you sure?") === true) {
      await deletePost(activeUser.token, post);
    }
  }

  async function handleProfile() {
    const username = post.username;
    const user = await fetchUser(activeUser.token, username);
    setProfileUser(user);
    navigate("/User");
  }

  return (
    <div className="post" id={post.id}>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <div className="user" onClick={handleProfile}>
                {post.name}
              </div>
              <span className="date">{post.date}</span>
            </div>
          </div>
          {activeUser?.username === post.username && !isEditing && (
            <div className="postMenu">
              <div className="item">
                <Edit onClick={() => setIsEditing(true)} />
              </div>
              <div className="item">
                <Trash onClick={() => handleDelete} />
              </div>
            </div>
          )}
        </div>
        <div className="content">
          {isEditing ? (
            <form onSubmit={handleEditSubmit}>
              <input
                value={editedPost.desc}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, desc: e.target.value })
                }
              />
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button type="submit">Save</button>
            </form>
          ) : (
            <>
              {post.desc}
              {post.postPic != "" && <img src={post.postPic} alt="" />}
            </>
          )}
        </div>
        <div className="info">
          <div className="item" onClick={handleLike}>
            {isLiked ? <Liked /> : <NotLiked />} Like: {post.likes.length}
          </div>
          <div className="item">
            <CommentsIcon /> Comment
          </div>
          <div className="item" onMouseEnter={() => setShareOpen(!shareOpen)}>
            <ShareIcon /> Share
          </div>
          {shareOpen && <ShareMenu />}
        </div>
      </div>
    </div>
  );
};

export default Post;
