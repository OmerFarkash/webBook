import "./postMenu.css";
import { ReactComponent as Edit } from "./Icons/pencil.svg";
import { ReactComponent as Trash } from "./Icons/trash.svg";
import { useContext } from "react";

const PostMenu = (setPostList, { postList, id }) => {
  const filteredPosts = postList.filter((item) => item.id !== id);
  const deletePost = () => {
    setPostList(filteredPosts);
  };
  return (
    <div className="postMenu">
      <div className="card">
        <div className="Menu">
          <p>
            <Edit />
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
