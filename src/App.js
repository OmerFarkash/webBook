import "./App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import { useState } from "react";
import { Toggle } from "./Components/Toggle/Toggle.js";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
