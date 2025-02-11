import "./App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import { useContext, useState } from "react";
import { Toggle } from "./Components/Toggle/Toggle.js";
import UserContext from "./UserContext.js";
import ProfileContext from "./ProfileContext.js";

function App() {
  const [isDark, setIsDark] = useState(false);
  const user = useContext(UserContext);
  const profile = useContext(ProfileContext)
  const [activeUser, setActiveUser] = useState(user);
  const [profileUser, setProfileUser] = useState(profile);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle
        testid="toggle-theme-btn"
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
      />
      <UserContext.Provider value={{ activeUser, setActiveUser }}>
      <ProfileContext.Provider value={{ profileUser, setProfileUser }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={activeUser.token === "" ? <Login /> : <Home />}
            />
            <Route path="/Register" element={<Register />} />
            <Route path= "/User" element={<Profile />} />
          </Routes>
        </BrowserRouter>
        </ProfileContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
