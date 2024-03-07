import "./comment.css";
import { useState, useEffect } from "react";
import { ReactComponent as Edit } from "../Post/Icons/pencil.svg";
import { ReactComponent as Trash } from "../Post/Icons/trash.svg";

const Comment = ({
  postId,
  id,
  desc,
  name,
  profilePic,
  date,
  editComment,
  deleteComment,
  activeUser,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState({ desc });

  useEffect(() => {
    setEditedComment({ desc });
  }, [desc]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editComment(id, editedComment);
    setIsEditing(false);
  };

  return (
    <div className="comment" key={id}>
      <img src={profilePic} alt="" key={name} />
      <div className="info">
        <span>{name}</span>
        <div className="desc">
          {activeUser?.name === name && !isEditing && (
            <div className="commentMenu">
              <div className="item">
                <Edit onClick={() => setIsEditing(true)} />
              </div>
              <div className="item">
                <Trash onClick={() => deleteComment(id)} />
              </div>
            </div>
          )}
          {isEditing ? (
            <form onSubmit={handleEditSubmit}>
              <input
                value={editedComment.desc}
                onChange={(e) =>
                  setEditedComment({ ...editedComment, desc: e.target.value })
                }
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <>{desc}</>
          )}
        </div>
      </div>
      <span className="date">{date}</span>
    </div>
  );
};

export default Comment;
