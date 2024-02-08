import "./feed.css";
import NewPost from "../NewPost/NewPost.js";
import Post from "../Post/Post.js";
import posts from "../../data/Posts.json";
import { useState } from "react";

const Feed = () => {
  const [postsList, setPostsList] = useState(posts);

  return (
    <div className="posts">
      <NewPost data={setPostsList} />
      {postsList.map((post) => (
        <Post {...post} />
      ))}
    </div>
  );
};

export default Feed;
