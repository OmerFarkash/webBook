import "./comments.css";
import comments from "../../data/Comments.json";
import Comment from "../Comment/Comment.js";

const Comments = ({id}) => {
  const filteredcComments = comments.filter((item) => item.postId === id);

  function handleNewComment() {
    return;
  }
  console.log(id);

  console.log(comments);
  console.log(filteredcComments);

  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
          }
          alt=""
        />
        <input type="text" placeholder="write a comment" />
        <button onClick={handleNewComment}>Send</button>
      </div>
      {filteredcComments.map((comment) => (
        <Comment {...comment} />
      ))}
    </div>
  );
};

export default Comments;
