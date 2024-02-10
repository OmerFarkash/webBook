import "./feed.css";
import NewPost from "../NewPost/NewPost.js";
import Post from "../Post/Post.js";
import posts from "../../data/Posts.json";
import { useState } from "react";

const Feed = ({user}) => {
  const [postsList, setPostsList] = useState(posts);

  console.log(postsList);

  return (
    <div className="posts">
      <NewPost setPostsList={setPostsList} postsList={postsList} user={user} />
      {postsList.map((post) => (
        <Post {...post} />
      ))}
    </div>
  );
};

export default Feed;
