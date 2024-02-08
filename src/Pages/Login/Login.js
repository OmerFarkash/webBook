import "./login.css";
import { Link } from "react-router-dom";
import users from "../../data/Users.json";

const Login = () => { 
  console.log(users);
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
        alert("Welcome " + users[i].name);
        return;
      }
    }
    alert("username or password is incorrect");
  }

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
