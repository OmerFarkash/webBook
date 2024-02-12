import "./comment.css";

const Comment = ({ postId, commentId, desc, user, profilePic, date}) => {
  return (
    <div className="comment" key={commentId}>
      <img src={profilePic} alt="" key={user} />
      <div className="info">
        <span>{user}</span>
        <p>{desc}</p>
      </div>
      <span className="date">{date}</span>
    </div>
  );
};

export default Comment;
