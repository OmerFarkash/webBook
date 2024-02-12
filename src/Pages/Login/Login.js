import "./login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../../UserContext.js";
import { useContext } from "react";

const Login = () => {
  const location = useLocation();
  const users = location.state;
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    if (users === null) {
      return;
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
        setUser(users[i]);
        alert("Welcome " + users[i].name);
        navigate("/Home");
        return;
      }
    }
    alert("username or password is incorrect");
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
            <input type="text" placeholder="username" />
            <input type="password" placeholder="Password" />
            <button id="loginbBtn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
