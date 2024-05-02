import { createPost, postPost } from "../../API/postApi";
import "./newPost.css";
import { useState } from "react";

const NewPost = ({ setPosts, posts, activeUser, socket }) => {
  const [values, setValues] = useState({
    desc: "",
    postPic: null,
  });

  const input = {
    name: "desc",
    type: "text",
    placeholder: "What's on your mind?",
    label: "postDesc",
    required: false,
  };

  const onChange = (e) => {
    if (e.target.name === "postPic") {
      setValues({ ...values, [e.target.name]: e.target.files[0] });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  //create and post new post
  const handleNewPost = (e) => {
    e.preventDefault();
    let postPic = values.postPic ? URL.createObjectURL(values.postPic) : null;
    let newPost = createPost(activeUser, values.desc, postPic);
    if (values.desc || values.postPic) {
      postPost(activeUser, newPost, socket); // need to define socket in Feed or Home
      // setPosts(...posts, newPost); // not sure if needed
    } else {
      alert("Post can't be empty!");
    }
  };

  return (
    <div className="newPost">
      <div className="card">
        <form onSubmit={handleNewPost}>
          <input {...input} value={values[input.name]} onChange={onChange} />
          <input type="file" name="postPic" onChange={onChange} />
          <button id="newPostBtn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
