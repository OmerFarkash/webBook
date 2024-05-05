import "./feed.css";
import NewPost from "../NewPost/NewPost.js";
import Post from "../Post/Post.js";
import { useContext, useEffect, useState } from "react";
import { fetchPosts } from "../../API/postApi.js";
import UserContext from "../../UserContext.js";

const Feed = () => {
  const activeUser = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      return await fetchPosts(activeUser.token);
    }
    setPosts(fetchData());
    if (posts != null) {
      setIsLoading(false);
    }
    console.log(posts);
  }, []);

  return (
    <div className="feed">
      <div className="posts">
        <NewPost setPosts={setPosts} postsList={posts} user={activeUser} />
        {isLoading ? (
          <div>No posts yet...</div>
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
