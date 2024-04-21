import "./post.css";
import { useState, useEffect } from "react";
import { ReactComponent as Liked } from "./Icons/liked.svg";
import { ReactComponent as NotLiked } from "./Icons/notLiked.svg";
import { ReactComponent as ShareIcon } from "./Icons/share.svg";
import { ReactComponent as CommentsIcon } from "./Icons/comments.svg";
import Comments from "../Comments/Comments";
import ShareMenu from "../ShareMenu/ShareMenu";
import { ReactComponent as Edit } from "./Icons/pencil.svg";
import { ReactComponent as Trash } from "./Icons/trash.svg";
import { likePost, editPost, deletePost } from "../../API/postApi";

const Post = ({ post, activeUser, socket }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ post });

  useEffect(() => {
    setEditedPost({ post });
  }, [post]);

  //handeling the submition of the edited post
  const handleEditSubmit = (e) => {
    e.preventDefault();
    editPost(activeUser.token, editedPost, socket); //need to define socket in Feed or Home
    setIsEditing(false);
  };

  //showing the image while in editing mode
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

  //like post
  async function handleLike(){
    setIsLiked(!isLiked);
    await likePost(activeUser.token, post);
  }

  //delete post
  async function handleDelete() {
    if (window.confirm("Are you sure?") === true) {
      await deletePost(activeUser.token, post);
    }
  }

  
  return (
    <div className="post" id={post.id}>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <span className="name">{post.name}</span>
              <span className="date">{post.date}</span>
            </div>
          </div>
          {activeUser?.name === post.name && !isEditing && (
            <div className="postMenu">
              <div className="item">
                <Edit onClick={() => setIsEditing(true)} />
              </div>
              <div className="item">
                <Trash onClick={() => handleDelete()} />
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
                  setEditedPost({ ...editedPost, desc: e.target.value })}/>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button type="submit">Save</button>
            </form>
          ) : (
            <>
              {post.desc}
              {post.postPic && <img src={post.postPic} alt="" />}
            </>
          )}
        </div>
        <div className="info">
          <div className="item" onClick={handleLike}>
            {isLiked ? <Liked /> : <NotLiked />} Like
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <CommentsIcon /> Comment
          </div>
          <div className="item" onMouseEnter={() => setShareOpen(!shareOpen)}>
            <ShareIcon /> Share
          </div>
          {shareOpen && <ShareMenu />}
        </div>
        {commentOpen && <Comments id={post.id} />}
      </div>
    </div>
  );
};

export default Post;
