import "./post.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as Liked } from "./Icons/liked.svg";
import { ReactComponent as NotLiked } from "./Icons/notLiked.svg";
import { ReactComponent as ShareIcon } from "./Icons/share.svg";
import { ReactComponent as CommentsIcon } from "./Icons/comments.svg";
import Comments from "../Comments/Comments";
import ShareMenu from "../ShareMenu/ShareMenu";
import posts from "../../data/Posts.json";

const Post = ({ id, user, profilePic, date, desc, img, commentsList }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shareOpen, setSareOpen] = useState(false);

  return (
    <div className="post" key={id}>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={profilePic} alt="" />
            <div className="details">
              <sp className="userName">{user}</sp>
              <sp className="date">{date}</sp>
            </div>
          </div>
        </div>
        <div className="content">
          {desc}
          <img src={img} alt="" />
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
        {commentOpen && <Comments data={id} />}
      </div>
    </div>
  );
};

export default Post;
