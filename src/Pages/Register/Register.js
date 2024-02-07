import "./register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Web Book.</h1>
          <span>Already have an account?</span>
          <Link to="/Login">
            <button>Login</button>
          </Link>
        </div>
        <div className="left">
          <h1>Register</h1>
          <form>
            <div class="input-group">
              <input
                type="text"
                aria-label="First name"
                class="form-control"
                placeholder="First Name"
              />
              <input
                type="text"
                aria-label="Last name"
                class="form-control"
                placeholder="Last Name"
              />
            </div>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email@email.com" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Password Confirmation" />
            <button id="registerBtn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
