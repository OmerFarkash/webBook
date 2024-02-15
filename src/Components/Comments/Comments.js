import "./comments.css";
import comments from "../../data/Comments.json";
import Comment from "../Comment/Comment.js";
import UserContext from "../../UserContext.js";
import PostMenu from "../PostMenu/PostMenu.js";
import { useState } from "react";
import { useContext } from "react";

const Comments = ({ id }) => {
  const { user } = useContext(UserContext);
  const [commentList, setCommentList] = useState(comments);

  console.log(commentList);

  const handleNewComment = (e) => {
    e.preventDefault();
    addComment(values.desc);
  };

  const [values, setValues] = useState({
    desc: "",
  });

  const addComment = (value) => {
    const newComment = {
      postId: id,
      id: commentList.length + 1,
      desc: value,
      name: user.name,
      profilePic: user.profilePic,
      date: "Just now",
    };
    setCommentList([newComment, ...commentList]);
  };

  const input = {
    name: "desc",
    type: "text",
    placeholder: "Write a comment",
    label: "commentDesc",
    required: true,
  };

  const onChange = (e) => {
    setValues({ [e.target.name]: e.target.value });
    console.log(values);
  };
  

  const editComment = (id, updatedComment) => {
    setCommentList(
      commentList.map((comment) => {
        if (comment.id === id) {
          return { ...comment, ...updatedComment };
        }
        return comment;
      })
    );
  };

  const deleteComment = (id) => {
    const filteredComments = commentList.filter((item) => item.id !== id);
    if (window.confirm("Are you sure?") == true) {
      setCommentList(filteredComments);
    }
  };

  const filteredcComments = commentList.filter((item) => item.postId === id);

  return (
    <div className="comments">
      <form onSubmit={handleNewComment}>
        <img src={user.profilePic} alt="" />
        <input {...input} value={values[input.name]} onChange={onChange} />
        <button id="newCommentBtn">Send</button>
      </form>
      {filteredcComments.map((comment) => (
        <Comment
          {...comment}
          editComment={editComment}
          deleteComment={deleteComment}
          activeUser={user}
        />
      ))}
    </div>
  );
};

export default Comments;
