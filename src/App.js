import "./App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import { useState } from "react";
import { Toggle } from "./Components/Toggle/Toggle.js";
import UserContext from './UserContext.js';

function App() {
  const [isDark, setIsDark] = useState(false);

  const [user, setUser] = useState(null);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle testid="toggle-theme-btn" isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
