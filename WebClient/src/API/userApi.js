/** @format */

async function fetchToken({ username, password }) {
    let res = await fetch("http://foo.com/api/tokens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) return null;

    const reader = res.body.getReader();
    let encodedResult = await reader.read();
    let token = new TextDecoder("utf-8").decode(encodedResult.value);
    return token;
}

async function fetchUser(token, username) {
    const res = await fetch(`http://foo.com/api/Users/${username}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;
    return JSON.parse(await res.text());
}

async function fetchFriends(token, username) {
    const res = await fetch(`http://foo.com/api/Users/${username}/Friends`, {
        method: "GET",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;
    return JSON.parse(await res.text());
}

async function postFriendReq(token, username) {
    const res = await fetch(`http://foo.com/api/Users/${username}/Friends`, {
        method: "POST",
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
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
        content: JSON.parse(await res.text()),
        ok: res.ok,
    };
}

function defaultUser() {
    return {
        username: "",
        profilePic: "",
        displayName: "",
        token: "",
    };
}

export { fetchToken, fetchUser, fetchFriends, postFriendReq, defaultUser };