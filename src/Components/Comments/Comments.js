import "./comments.css";
import comments from "../../data/Comments.json";
import Comment from "../Comment/Comment.js";
import UserContext from "../../UserContext.js";
import PostMenu from "../PostMenu/PostMenu.js";
import { useState } from "react";
import { useContext } from "react";


const Comments = ({ id ,profilePic}) => {
  const { user } = useContext(UserContext);
  const [commentList, setCommentList] = useState(comments);
  console.log(commentList)

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
      id: filteredcComments.length + 1,
      desc: value,
      user: user.name,
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

  const filteredcComments = commentList.filter((item) => item.postId === id);

  return (
    <div className="comments">
        <form onSubmit={handleNewComment}>
          <img
            src={profilePic}
            alt=""
          />
          <input {...input} value={values[input.name]} onChange={onChange} />
          <button id="newCommentBtn">Send</button>
        </form>
      {filteredcComments.map((comment) => (
        <div>
          {user.name === comment.user && (
            <PostMenu
              setPostsList={setCommentList}
              postsList={commentList}
              postId={comment.id}
            />
          )}
        <Comment {...comment} />
        </div>
      ))}
    </div>
  );
};

export default Comments;
