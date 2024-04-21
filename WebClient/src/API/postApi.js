/** @format */

async function fetchPosts(token) {
    const res = await fetch(`http://foo.com/api/posts`, {
        method: "GET",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;
    return JSON.parse(await res.text());
}

async function fetchPost(token,username, id) {
    const res = await fetch(`http://foo.com/api/users/${username}/posts/${id}`, {
        method: "GET",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;
    return JSON.parse(await res.text());
}

async function deletePost(token, post) {
    const res = await fetch(`http://foo.com/api/users/${post.name}/posts/${post.id}`, {
        method: "DELETE",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
        },
    });
}

async function editPost(token, post, socket) {
    const res = await fetch(`http://foo.com/api/users/${post.username}/posts/${post.id}`, {
        method: "PUT",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...post}),
    });

    let msg = null
    if (res.ok) {
        msg = JSON.parse(await res.text());
    }
    
    socket.emit("post", { user:user, post:post });
    
    return msg;
}

async function postPost(user, post, socket) {
    const res = await fetch(`http://foo.com/api/users/${user.username}/posts/${post.id}`, {
        method: "POST",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...post}),
    });

    let msg = null
    if (res.ok) {
        msg = JSON.parse(await res.text());
    }

    socket.emit("post", { user:user, post:post });

    return msg;
}

function createPost(id, user, desc, pic) {
    return {
        id: id,
        name: user.name,
        profilePic: user.profilePic,
        date: "",
        desc: desc,
        postPic: pic,
    };
}

async function likePost(token, post) {
    const res = await fetch(`http://foo.com/api/users/${post.name}/posts/${post.id}/likes`, {
        method: "POST",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({token}),
    });

    if (!res.ok) return null;
    return JSON.parse(await res.text());
}

export { fetchPosts, fetchPost, deletePost, editPost, postPost, createPost, likePost }