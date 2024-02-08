import "./newPost.css";

const NewPost = (setPostsList) => {
  function handleNewPost() {
    return;
  }

  return (
    <div className="newPost">
      <div className="card">
        <form>
          <input
            className="Post"
            type="text"
            placeholder="What's on ypur mind?"
          />
          <input className="photo" type="File" id="postImage" />
        </form>
        <div className="addBtn" onClick={() => handleNewPost()}>
          <button>add</button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
