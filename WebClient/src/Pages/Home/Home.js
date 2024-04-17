import "./home.css";
import LeftBar from "../../Components/LeftBar/LeftBar.js";
import NavBar from "../../Components/NavBar/NavBar.js";
import Feed from "../../Components/Feed/Feed.js";
import UserContext from "../../UserContext.js";
import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

const Home = ({activeUser, setActiveUser}) => {
  // const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user === null) {
  //     navigate('/');
  //   }
  // }, [user, navigate]);

  return (
    <div className="Home" >
      <NavBar activeUser={activeUser} />
      <LeftBar />
      <Feed activeUser={activeUser} />
    </div>
  );
};

export default Home;
