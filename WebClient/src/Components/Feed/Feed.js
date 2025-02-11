import "./feed.css";
import NewPost from "../NewPost/NewPost.js";
import Post from "../Post/Post.js";
import { useContext, useEffect, useState } from "react";
import { fetchPosts } from "../../API/postApi.js";
import UserContext from "../../UserContext.js";

const Feed = () => {
  const activeUser = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let postslist = await fetchPosts(activeUser.activeUser.token);
      setPosts(JSON.parse(postslist));
    }
    fetchData()
    if (posts.length > 0) {
      setIsLoading(false);
    }
  }, [posts.length]);

  return (
    <div className="feed">
      <div className="posts">
        <NewPost
          setPosts={setPosts}
          postsList={posts}
          activeUser={activeUser.activeUser}
        />
        {isLoading ? (
          <div>No posts yet...</div>
        ) : (
          posts.map((post) => (
            <div className="Post">
            <Post
              key={post.id}
              post={post}
              activeUser={activeUser.activeUser}
            />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
