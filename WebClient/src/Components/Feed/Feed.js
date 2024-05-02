import "./feed.css";
import NewPost from "../NewPost/NewPost.js";
import Post from "../Post/Post.js";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../API/postApi.js";

const Feed = ({ activeUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    setPosts(await fetchPosts(activeUser.token));
    setIsLoading(false);
  });

  return (
    <div className="feed">
      <div className="posts">
        <NewPost setPosts={setPosts} postsList={posts} user={activeUser} />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          posts.map((post) => (
            <Post key={post.id} post={post} activeUser={activeUser} />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
