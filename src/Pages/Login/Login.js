import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
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
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <Link to="/">
            <button id="loginbBtn">Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
