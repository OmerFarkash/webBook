import "./home.css";
import LeftBar from "../../Components/LeftBar/LeftBar.js";
import NavBar from "../../Components/NavBar/NavBar.js";
import Feed from "../../Components/Feed/Feed.js";
import UserContext from "../../UserContext.js";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReqList from "../../Components/ReqList/ReqList.js";

const Home = () => {
  return (
    <div className="home">
      <NavBar />
      <LeftBar />
      <Feed />
      <ReqList />
    </div>
  );
};

export default Home;
