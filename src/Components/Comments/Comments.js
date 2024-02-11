import "./comments.css";
import comments from "../../data/Comments.json";
import Comment from "../Comment/Comment.js";
import UserContext from "../../UserContext.js";

import { useState } from "react";
import { useContext } from "react";


const Comments = ({ id }) => {
  const { user } = useContext(UserContext);
  const [commentList, setCommentList] = useState(comments);

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
      commentId: filteredcComments.length + 1,
      desc: value,
      user: user.name,
      profilePic: "",
      date: "Just now",
    };
    console.log(newComment);
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

  const filteredcComments = commentList.filter((item) => item.postId === id);

  return (
    <div className="comments">
        <form onSubmit={handleNewComment}>
          <img
            src={
              "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
            }
            alt=""
          />
          <input {...input} value={values[input.name]} onChange={onChange} />
          <button id="newCommentBtn">Send</button>
        </form>
      {filteredcComments.map((comment) => (
        <Comment {...comment} />
      ))}
    </div>
  );
};

export default Comments;
