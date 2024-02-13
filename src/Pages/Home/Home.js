import "./home.css";
import LeftBar from "../../Components/LeftBar/LeftBar.js";
import NavBar from "../../Components/NavBar/NavBar.js";
import Feed from "../../Components/Feed/Feed.js";
import UserContext from "../../UserContext.js";
import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user, navigate]);

  console.log(user);
  return (
    <div className="Home" >
      <NavBar user={user} />
      <LeftBar />
      <Feed activeUser={user} />
    </div>
  );
};

export default Home;
