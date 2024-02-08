import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import RegInput from "../../Components/RegIn/RegInput.js";
import usersExsist from "../../data/Users.json";



const Register = () => {
  const [users, setUsers] = useState(usersExsist); 
  
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  
  console.log("re-rendered");

  const addUser = ({name, username, email, password}) => {
    const newUser = {
      id: users.length + 1,
      name: name,
      username: username,
      email: email,
      password: password,
    };
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === newUser.username) {
        alert("Username already exists");
        return;
      }
    }
    setUsers([...users, newUser]);
    alert("User has been added successfully");
    // move to login page
  }
  

  const handleSubmit = (e) => {
    e.preventDefault(addUser(values));
    
  }


  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Full Name",
      errorMessage: "Full name must be 3-16 characters long, can contain only English letters.",
      label: "Full Name",
      pattern: "^[ a-zA-Z]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "username",
      type: "text",
      placeholder: "userName",
      errorMessage: "username must be 3-16 characters long, it contains only English letters and numbers.",
      label: "userName",
      pattern: "^[ a-zA-Z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email@email.com",
      errorMessage: "Enter a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "password must be between 8-16 characters long, contain at least one number, " +
       "one uppercase and one lowercase letter and one special character.",
      label: "Password",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-z0-9!@#$%^&*]{8,16})",
      required: true,
    },
    {
      id: 5,
      name: "passwordConfirmation",
      type: "password",
      placeholder: "Password Confirmation",
      errorMessage: "Passwords do not match.",
      label: "Password Confirmation",
      pattern: values.password,
      required: true,
    },
  ]

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);

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
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
            <RegInput key={input.id} {...input} value={values[input.name]} onChange={onChange} /> 
            ))}
            <button id="registerBtn"

            >Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
