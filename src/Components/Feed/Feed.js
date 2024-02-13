import "./feed.css";
import NewPost from "../NewPost/NewPost.js";
import Post from "../Post/Post.js";
import posts from "../../data/Posts.json";
import { useState } from "react";
import PostMenu from "../PostMenu/PostMenu.js";
import UserContext from "../../UserContext.js";
import React, { useContext } from "react";

const Feed = ({ activeUser }) => {
  // const { activeUser } = useContext(UserContext);
  const [postsList, setPostsList] = useState(posts);

  console.log(postsList);

  return (
    <div className="posts">
      <NewPost
        setPostsList={setPostsList}
        postsList={postsList}
        user={activeUser}
      />
      {postsList.map((post) => (
        <div>
          {activeUser.name === post.user && (
            <PostMenu
              setPostsList={setPostsList}
              postsList={postsList}
              postId={post.id}
            />
          )}
          <Post {...post} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
