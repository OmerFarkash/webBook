import "./post.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as Liked } from "./Icons/liked.svg";
import { ReactComponent as NotLiked } from "./Icons/notLiked.svg";
import { ReactComponent as ShareIcon } from "./Icons/share.svg";
import { ReactComponent as CommentsIcon } from "./Icons/comments.svg";
import Comments from "../Comments/Comments";
import ShareMenu from "../ShareMenu/ShareMenu";

const Post = ({ id, user, profilePic, date, desc, postPic }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shareOpen, setSareOpen] = useState(false);

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
        </div>
        <div className="content">
          {desc}
          {postPic && <img src={postPic} alt="" />}
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
