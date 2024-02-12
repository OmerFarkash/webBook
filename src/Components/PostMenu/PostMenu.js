import "./postMenu.css";
import { ReactComponent as Edit } from "./Icons/pencil.svg";
import { ReactComponent as Trash } from "./Icons/trash.svg";

const PostMenu = ({ setPostsList, postsList, postId }) => {
  const deletePost = () => {
    const filteredPosts = postsList.filter((item) => item.id !== postId);
    setPostsList(filteredPosts);
  };

  return (
    <div className="PostMenu">
      <div className="card">
        <div className="Menu">
          <p>
            {/* <Edit /> */}
          </p>
          <p>
            <Trash onClick={deletePost} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostMenu;
