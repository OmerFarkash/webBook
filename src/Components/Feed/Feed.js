import "./feed.css";
import NewPost from "../NewPost/NewPost.js";
import Post from "../Post/Post.js";
import posts from "../../data/Posts.json";
import { useState } from "react";

const Feed = ({ activeUser }) => {
  const [postsList, setPostsList] = useState(posts);

  const editPost = (id, updatedPost) => {
    setPostsList(
      postsList.map((post) => {
        if (post.id === id) {
          return { ...post, ...updatedPost };
        }
        return post;
      })
    );
  };

  const deletePost = (postId) => {
    const filteredPosts = postsList.filter((item) => item.id !== postId);
    if (window.confirm("Are you sure?") == true) {
      setPostsList(filteredPosts);
    }
  };

  return (
    <div className="posts">
      <NewPost
        setPostsList={setPostsList}
        postsList={postsList}
        user={activeUser}
      />
      {postsList.map((post) => (
        <Post
        key={post.id}  
        {...post}
          editPost={editPost}
          deletePost={deletePost}
          activeUser={activeUser}
        />
      ))}
    </div>
  );
};

export default Feed;
