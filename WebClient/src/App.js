import "./App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { BrowserRouter, Routes, Route, Await } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import { useState } from "react";
import { Toggle } from "./Components/Toggle/Toggle.js";
import UserContext from "./UserContext.js";
import { fetchUser, fetchFriends } from "./API/userApi.js";
import { fetchPosts } from "./API/postApi.js";
import { defaultUser } from "./API/userApi.js";

function App() {
  const [isDark, setIsDark] = useState(false);
  // const [user, setUser] = useState(null);

  const [activeUser, setActiveUser] = useState(defaultUser);

  const setUserByToken = async (token, username) => {
    let user = await fetchUser(token, username);
    let friends = await fetchFriends(token);
    let posts = await fetchPosts(token);
    setActiveUser ({
      name: user.name,
      username: username,
      profilePic: user.profilePic,
      token: token,
      friends: friends,
      posts: posts,
    });
  };

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle
        testid="toggle-theme-btn"
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)} />
      <UserContext.Provider value={{ activeUser, setActiveUser }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                activeUser.token === "" ? (
                  <Login setUserByToken={setUserByToken} />
                ) : (
                  <Home activeUser={activeUser} setActiveUser={setActiveUser} />
                )
              }
            />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
