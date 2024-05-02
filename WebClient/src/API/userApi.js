/** @format */
const server = 'localhost:12345';

// works
async function fetchToken(username, password ) {
    const res = await fetch(`http://${server}/api/tokens/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username": username, "password": password }),
    });

    let token = await res.text();
    return token;
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
    return (result);
}

async function editUser(editedUser) {
    const res = await fetch(`http://${server}/api/users/${editedUser.username}`, {
        method: "PUT",
        headers: {
            accept: "*/*",
            Authorization: `${editedUser.token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "id": editedUser.username, "newUsername": editedUser.name, "newProfilePic": editedUser.profilePic }),
    });

    if (!res.ok) return null;
    let result = await res.text();
    return (result);
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
    return (result);
}

async function fetchFriendReqs(token) {
    //need to return the list of friend requests
}

async function postFriendReq(token, username) {
    const res = await fetch(`http://${server}/api/users/${username}/friends`, {
        method: "POST",
        headers: {
            accept: "*/*",
            Authorization: `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    });

    if (!res.ok) {
        return {
            content: await res.text(),
            ok: res.ok,
        };
    }

    return {
        content: (await res.text()),
        ok: res.ok,
    };
}

async function acceptFriendReq(activeUser, friend) {
    let activeUsername = activeUser.username;
    let friendUsername = friend.username;
    const res = await fetch(`http://${server}/api/users/${activeUsername}/friends/${friendUsername}`, {
        method: "PATCH",
        headers: {
            accept: "*/*",
            Authorization: `${activeUser.token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({activeUsername, friendUsername}),
    });

    if (!res.ok) {
        return {
            content: await res.text(),
            ok: res.ok,
        };
    }

    return {
        content: (await res.text()),
        ok: res.ok,
    };
}

async function deleteFriendReq(activeUser, friend) {
    let activeUsername = activeUser.username;
    let friendUsername = friend.username;
    const res = await fetch(`http://${server}/api/users/${activeUsername}/friends/${friendUsername}`, {
        method: "DELETE",
        headers: {
            accept: "*/*",
            Authorization: `${activeUser.token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({activeUsername, friendUsername}),
    });

    if (!res.ok) {
        return {
            content: await res.text(),
            ok: res.ok,
        };
    }

    return {
        content: (await res.text()),
        ok: res.ok,
    };
}

function defaultUser() {
    return {
        username: "",
        profilePic: "",
        displayName: "",
        token: null,
    };
}

export { fetchToken, fetchUser, editUser, fetchFriends, fetchFriendReqs, postFriendReq, acceptFriendReq, deleteFriendReq, defaultUser };