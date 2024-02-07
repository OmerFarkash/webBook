import "./post.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as Liked } from "./Icons/liked.svg";
import { ReactComponent as NotLiked } from "./Icons/notLiked.svg";
import { ReactComponent as ShareIcon } from "./Icons/share.svg";
import { ReactComponent as CommentsIcon } from "./Icons/comments.svg";

const Post = ({ id, user, profilePic, date, desc, img }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [isLiked, setLiked] = useState(false);

  return (
    <div className="post" key={id}>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={profilePic} alt="" />
            <div className="details">
              <span className="userName">{user}</span>
              <span className="date">{date}</span>
            </div>
          </div>
        </div>
        <div className="content">
          {desc}
          <img src={img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={() => setLiked(!isLiked)}>
            {isLiked ? <Liked /> : <NotLiked />} Like
          </div>
          <div>
            <CommentsIcon /> Comment
            <div
              className="item"
              onClick={() => setCommentOpen(!commentOpen)}
            ></div>
          </div>
          <div className="item">
            <ShareIcon /> Share
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
