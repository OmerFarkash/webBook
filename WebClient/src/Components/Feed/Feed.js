import "./feed.css";
import NewPost from "../NewPost/NewPost.js";
import Post from "../Post/Post.js";
// import posts from "../../data/Posts.json";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../API/postApi.js";

const Feed = async ({ activeUser }) => {

  const [posts, setPosts] = useState([]);
  let postsList = await fetchPosts(activeUser.token);
  setPosts(await postsList);

  return (
    <div className="posts">
      <NewPost
        setPosts={setPosts}
        postsList={posts}
        user={activeUser}
      />
      {posts.map((post) => (
        <Post
        
        key={post.id}  
        post = {post}
          activeUser={activeUser}
        />
      ))}
    </div>
  );
};

export default Feed;
