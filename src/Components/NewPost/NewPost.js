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
          <div className="addBtn" onClick={() => handleNewPost()}>
            <button>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
