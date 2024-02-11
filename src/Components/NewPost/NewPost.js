import "./newPost.css";
import { useState } from "react";

const NewPost = ({ setPostsList, postsList, user }) => {

  const handleNewPost = (e) => {
    e.preventDefault();
    addPost(values.desc);
  };

  const [values, setValues] = useState({
    desc: ""
  });

  const addPost = (value) => {
    const newPost = {
      id: postsList.length + 1,
      user: user.username,
      profilePic: "user.profilePic",
      date: "Just now",
      desc: value,
    };
    console.log(newPost);
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
    setValues({[e.target.name]: e.target.value });
    console.log(values);
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
          <button id="newPostBtn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
