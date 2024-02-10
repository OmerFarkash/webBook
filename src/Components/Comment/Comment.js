import "./comment.css";

const Comment = ({ postId, commentId, desc, user, profilePicture, date}) => {
  return (
    <div className="comment" key={commentId}>
      <img src={profilePicture} alt="" key={user} />
      <div className="info">
        <span>{user}</span>
        <p>{desc}</p>
      </div>
      <span className="date">{date}</span>
    </div>
  );
};

export default Comment;
