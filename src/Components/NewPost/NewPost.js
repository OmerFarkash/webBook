import "./newPost.css";
import { useState } from "react";

const NewPost = ({ setPostsList, postsList, user }) => {

  const handleNewPost = (e) => {
    e.preventDefault();
    addPost(values.desc);
  };

  const [values, setValues] = useState({
    desc: "",
    postPic: null,
  });

  const addPost = (value) => {
    const newPost = {
      id: postsList.length + 1,
      user: user.username,
      profilePic: user.profilePic,
      date: "Just now",
      desc: value,
      postPic: values.postPic ? URL.createObjectURL(values.postPic) : null,
    };
    setPostsList([newPost, ...postsList]);
  };

  const input = 
    {
      name: "desc",
      type: "text",
      placeholder: "What's on your mind?",
      label: "postDesc",
      required: true,
    };

  const onChange = (e) => {
    if (e.target.name === 'postPic') {
      setValues({ ...values, [e.target.name]: e.target.files[0] });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="newPost">
      <div className="card">
        <form onSubmit={handleNewPost}>
          <input
          {...input}
            value={values[input.name]}
            onChange={onChange}
          />
          <input
            type="file"
            name="postPic"
            onChange={onChange}
          />
          <button id="newPostBtn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
