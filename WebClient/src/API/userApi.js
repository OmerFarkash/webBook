/** @format */
const server = 'localhost:12345';

// works
async function fetchToken(username, password ) {
    let res = await fetch(`http://${server}/api/tokens/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "username": username, "password": password }),
    });

    var token = await res.text();
    return token;
}

async function fetchUser(token, username) {
    const res = await fetch(`http://${server}/api/Users/${username}`, {
        method: "GET",
        headers: {
            Authorization: `${token}`,
        },
    });

    if (!res.ok) return null;
    let result = await res.text();
    return (result);
}

async function fetchFriends(token, username) {
    const res = await fetch(`http://${server}/api/Users/${username}/Friends`, {
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

async function postFriendReq(token, username) {
    const res = await fetch(`http://${server}/api/Users/${username}/Friends`, {
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

function defaultUser() {
    return {
        username: "",
        profilePic: "",
        displayName: "",
        token: null,
    };
}

export { fetchToken, fetchUser, fetchFriends, postFriendReq, defaultUser };