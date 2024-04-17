import { createPost, postPost } from "../../API/postApi";
import "./newPost.css";
import { useState } from "react";

const NewPost = ({ user, socket }) => {
  const handleNewPost = (e) => {
    e.preventDefault();
    addPost(values.desc);
  };

  const [values, setValues] = useState({
    desc: "",
    postPic: null,
  });

  const addPost = (value) => {
    let postPic = values.postPic ? URL.createObjectURL(values.postPic) : null;
    let post = createPost(id, user, value, postPic);
    if (value || values.postPic) {
      postPost(user.token, user, post, socket);
    } else {
      alert("Post can't be empty");
    }
  };

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
