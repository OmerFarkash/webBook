import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchToken } from "../../API/userApi.js";

const Login = ({ setUserByToken }) => {

  //const [input, setInput] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    let token = await fetchToken(username, password);
    
    if (token === "") {
      alert("Wrong username or password");
    } else {
      await setUserByToken(token, username);
    }
  };

    return (
      <div className="Login">
        <div className="card">
          <div className="left">
            <h1>Web Book.</h1>
            <span>Don't have an account yet?</span>
            <Link to="/Register">
              <button>Register</button>
            </Link>
          </div>
          <div className="right">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="username"
              />
              <input
                type="password"
                placeholder="Password"
              />
              <button id="loginbBtn">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default Login;
