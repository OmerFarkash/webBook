import "./App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import { useState } from "react";
import { Toggle } from "./Components/Toggle/Toggle.js";
import { fetchUser } from "./API/userApi.js";
import { defaultUser } from "./API/userApi.js";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeUser, setActiveUser] = useState(defaultUser);

  const setUserByToken = async (token, username) => {
    console.log(activeUser);
    const user = await fetchUser(token, username);
    console.log(user);
    if (user == null) {
      return;
    }
    setActiveUser({
      name: user.name,
      username: user.username,
      profilePic: user.profilePic,
      token: user.androidToken,
      friends: user.friends,
      posts: user.posts,
    });
    console.log(activeUser);
  };

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle
        testid="toggle-theme-btn"
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
      />
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
          <Route
            path="/User"
            element={<Profile activeUser={activeUser} user={activeUser} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
