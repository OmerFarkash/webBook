/** @format */

async function fetchPosts(token) {
    const res = await fetch(`http://foo.com/api/Posts`, {
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
    const res = await fetch(`http://foo.com/api/Users/${username}/Posts/${id}`, {
        method: "GET",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;
    return JSON.parse(await res.text());
}

async function deletePost(token, username, id) {
    const res = await fetch(`http://foo.com/api/Users/${username}/Posts/${id}`, {
        method: "DELETE",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
        },
    });
}

async function editPost(token, username, post, id, socket) {
        const res = await fetch(`http://foo.com/api/Users/${username}/Posts/${id}`, {
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

async function postPost(token, username, post, socket) {
    const res = await fetch(`http://foo.com/api/Users/${username}/Posts/${post.id}`, {
        method: "POST",
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

function createPost(id, user, desc, pic) {
    return {
        id: id,
        name: user.name,
        profilePic: user.profilePic,
        date: "Just now",
        desc: desc,
        postPic: pic,
    };
}

// function likePost(token, username, post, id, socket) {
    
// }

export { fetchPosts, fetchPost, deletePost, editPost, postPost, createPost }