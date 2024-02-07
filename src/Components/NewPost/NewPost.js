import "./newPost.css";

const NewPost = () => {
  return (
    <div className="newPost">
      <div className="container">
        <form>
          <input
            className="Post"
            type="text"
            placeholder="What's on ypur mind?"
          />
          <input type="File" id="postImage" />
        </form>
      </div>
    </div>
  );
};

export default NewPost;
