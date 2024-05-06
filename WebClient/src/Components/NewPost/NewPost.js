import { createPost, fetchPosts, postPost } from "../../API/postApi";
import "./newPost.css";
import { useState } from "react";

const NewPost = ({ setPosts, postsList, activeUser, socket }) => {
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
  const handleNewPost = async (e) => {
    e.preventDefault();
    let postPic = values.postPic ? URL.createObjectURL(values.postPic) : null;
    let newPost = createPost(activeUser, values.desc, postPic);
    if (values.desc || values.postPic) {
      await postPost(activeUser, newPost);
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
