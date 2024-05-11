/** @format */
const server = "localhost:12345";

// works
async function fetchToken(username, password) {
  const res = await fetch(`http://${server}/api/tokens/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  if (!res.ok) return null;
  let result = await res.text();
  return result;
}

async function fetchUser(token, username) {
  const res = await fetch(`http://${server}/api/users/${username}`, {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `${token}`,
    },
  });
  if (!res.ok) return null;
  let result = await res.text();
  return JSON.parse(result);
}

async function editUser(editedUser) {
  const res = await fetch(`http://${server}/api/users/${editedUser.username}`, {
    method: "PATCH",
    headers: {
      accept: "*/*",
      Authorization: `${editedUser.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: editedUser.username,
      newName: editedUser.name,
      newProfilePic: editedUser.profilePic,
    }),
  });

  if (!res.ok) return null;
  let result = await res.text();
  return JSON.parse(result);
}

async function deleteUser(user) {
  const res = await fetch(`http://${server}/api/users/${user.username}`, {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization: `${user.token}`,
    },
  });
  if (!res.ok) return null;
  let result = await res.text();
  return result;
}

async function fetchFriends(token, username) {
  const res = await fetch(`http://${server}/api/users/${username}/friends`, {
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

async function fetchFriendReqs(activeUser) {
  const res = await fetch(
    `http://${server}/api/users/${activeUser.username}/friendReqs`,
    {
      method: "GET",
      headers: {
        accept: "text/plain",
        Authorization: `${activeUser.token}`,
      },
    }
  );

  if (!res.ok) return null;
  let result = await res.text();
  return JSON.parse(result);
}

async function postFriendReq(token, username) {
  const res = await fetch(`http://${server}/api/users/${username}/friends`, {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `${token}`,
    },
  });
  if (!res.ok) return;
  let result = await res.text();
  return result;
}

async function acceptFriendReq(activeUser, friendUsername) {
  let activeUsername = activeUser.username;
  const res = await fetch(
    `http://${server}/api/users/${activeUsername}/friends/${friendUsername}`,
    {
      method: "PATCH",
      headers: {
        accept: "*/*",
        Authorization: `${activeUser.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activeUsername, friendUsername }),
    }
  );

  if (!res.ok) return;
  let result = await res.text();
  return result;
}

async function deleteFriendReq(activeUser, friendUsername) {
  let activeUsername = activeUser.username;
  const res = await fetch(
    `http://${server}/api/users/${activeUsername}/friends/${friendUsername}`,
    {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `${activeUser.token}`,
      },
    }
  );
  if (!res.ok) return;
  let result = await res.text();
  return result;
}

const defaultUser = {
  name: "",
  username: "",
  profilePic: "",
  token: "",
  friends: [""],
  posts: [""],
  friendRequestsSent: [""],
};

export {
  fetchToken,
  fetchUser,
  editUser,
  deleteUser,
  fetchFriends,
  fetchFriendReqs,
  postFriendReq,
  acceptFriendReq,
  deleteFriendReq,
  defaultUser,
};
