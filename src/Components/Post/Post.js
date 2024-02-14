import "./post.css";
import { useState, useEffect } from "react";
import { ReactComponent as Liked } from "./Icons/liked.svg";
import { ReactComponent as NotLiked } from "./Icons/notLiked.svg";
import { ReactComponent as ShareIcon } from "./Icons/share.svg";
import { ReactComponent as CommentsIcon } from "./Icons/comments.svg";
import Comments from "../Comments/Comments";
import ShareMenu from "../ShareMenu/ShareMenu";

const Post = ({ id, user, profilePic, date, desc, postPic, editPost, activeUser }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shareOpen, setSareOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ desc, postPic });

  useEffect(() => {
    setEditedPost({ desc, postPic });
  }, [desc, postPic]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editPost(id, editedPost);
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedPost({ ...editedPost, postPic: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="post" id={id}>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={profilePic} alt="" />
            <div className="details">
              <span className="name">{user}</span>
              <span className="date">{date}</span>
            </div>
          </div>
          {activeUser?.name === user && !isEditing && (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
        <div className="content">
          {isEditing ? (
            <form onSubmit={handleEditSubmit}>
              <textarea
                value={editedPost.desc}
                onChange={(e) => setEditedPost({ ...editedPost, desc: e.target.value })}
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
              {desc}
              {postPic && <img src={postPic} alt="" />}
            </>
          )}
        </div>
        <div className="info">
          <div className="item" onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? <Liked /> : <NotLiked />} Like
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <CommentsIcon /> Comment
          </div>
          <div className="item" onMouseEnter={() => setSareOpen(!shareOpen)}>
            <ShareIcon /> Share
          </div>
          {shareOpen && <ShareMenu />}
        </div>
        {commentOpen && <Comments id={id} profilePic={profilePic} />}
      </div>
    </div>
  );
};

export default Post;
