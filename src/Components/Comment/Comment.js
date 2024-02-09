import "./comment.css";

const Comment = ({postId, commentId, desc, userId, profilePicture }) => {
  return (
    <div className="comment" key={commentId}>
      <img src={profilePicture} alt="" key={userId}/>
      <div className="info">
        <span>name</span>
        <p>{desc}</p>
      </div>
      <span className="date">1 hour ago</span>
    </div>
  );
};

export default Comment;