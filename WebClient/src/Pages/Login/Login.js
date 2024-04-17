import "./login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../../UserContext.js";
import { useContext, useState } from "react";

const Login = ({ setUserByToken }) => {
  const location = useLocation();
  const users = location.state;
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [input, setInput] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = await fetchToken(input);
    if (token === null) {
      alert("Wrong username or password");
    } else {
      setUserByToken(token, input.username);
    }
    //   for (let i = 0; i < users.length; i++) {
    //     if (users[i].username === username && users[i].password === password) {
    //       setUser(users[i]);
    //       alert("Welcome " + users[i].name);
    //       navigate("/Home");
    //       return;
    //     }
    //   }
    //   alert("username or password is incorrect");
    // };

    const handleChange = (name, value) => {
      setInput({
        ...input,
        [name]: value,
      });
    };

    const setInputUsername = (value) => {
      handleChange("username", value);
    };

    const setInputPassword = (value) => {
      handleChange("password", value);
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
                onChange={setInputUsername}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={setInputPassword}
              />
              <button id="loginbBtn">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
};

export default Login;
