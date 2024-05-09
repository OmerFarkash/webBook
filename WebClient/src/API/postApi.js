/** @format */
const server = "localhost:12345";

async function fetchPosts(token) {
  const res = await fetch(`http://${server}/api/posts/`, {
    method: "GET",
    headers: {
      accept: "text/plain",
      Authorization: `${token}`,
    },
  });
  if (!res.ok) return null;
  let result = await res.text();
  return JSON.parse(result);
}

async function fetchProfilePosts(token, username) {
  const res = await fetch(
    `http://${server}/api/users/${username}/posts`,
    {
      method: "GET",
      headers: {
        accept: "text/plain",
        Authorization: `${token}`,
      },
    }
  );

  if (!res.ok) return null;
  let result = await res.text();
  return JSON.parse(result);
}

async function deletePost(token, post) {
  await fetch(`http://${server}/api/users/${post.username}/posts/${post._id}`, {
    method: "DELETE",
    headers: {
      accept: "text/plain",
      Authorization: `${token}`,
    },
  });
}

async function editPost(token, post) {
  const res = await fetch(
    `http://${server}/api/users/${post.username}/posts/${post._id}`,
    {
      method: "PUT",
      headers: {
        accept: "text/plain",
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "desc": post.desc,
        "postPic": post.postPic,
      }),
    }
  );

  let msg = null;
  if (res.ok) {
    msg = JSON.parse(await res.text());
  }

  return msg;
}

async function postPost(user, post) {
  const res = await fetch(
    `http://${server}/api/users/${user.username}/posts/`,
    {
      method: "POST",
      headers: {
        accept: "text/plain",
        Authorization: `${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...post }),
    }
  );

  let msg = null;
  if (res.ok) {
    msg = JSON.parse(await res.text());
  }

  // socket.emit("post", { user: user, post: post });

  return msg;
}

function createPost(user, desc, pic) {
  return {
    name: user.name,
    profilePic: user.profilePic,
    username: user.username,
    date: "",
    desc: desc,
    postPic: pic,
    likes:[],
  };
}

async function likePost(token, post) {
  const res = await fetch(
    `http://${server}/api/posts/${post._id}/likes`,
    {
      method: "POST",
      headers: {
        accept: "text/plain",
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) return null;
  let result = await res.text();
  return JSON.parse(result);
}

export {
  fetchPosts,
  fetchProfilePosts,
  deletePost,
  editPost,
  postPost,
  createPost,
  likePost,
};
