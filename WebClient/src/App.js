import "./App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import { useContext, useState } from "react";
import { Toggle } from "./Components/Toggle/Toggle.js";
import UserContext from "./UserContext.js";
import { defaultUser } from "./API/userApi.js";

function App() {
  const [isDark, setIsDark] = useState(false);
  const user = useContext(UserContext);
  const [activeUser, setActiveUser] = useState(user);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle
        testid="toggle-theme-btn"
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
      />
      <UserContext.Provider value={{ activeUser, setActiveUser }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={activeUser.token === "" ? <Login /> : <Home />}
            />
            <Route path="/Register" element={<Register />} />
            <Route path= {`/User/${activeUser.username}`} element={<Profile user={activeUser} />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
