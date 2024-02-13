import { useEffect, useState } from "react";
import "./register.css";
import RegInput from "../../Components/RegIn/RegInput.js";
import usersExsist from "../../data/Users.json";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [users, setUsers] = useState(usersExsist);

  useEffect(() => {
    setUsers(usersExsist);
  }, []);

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    profilePic: ""
  });

  const addUser = ({ name, username, email, password, profilePic}) => {
    const newUser = {
      id: users.length + 1,
      name: name,
      username: username,
      email: email,
      password: password,
      profilePic: URL.createObjectURL(profilePic),
    };
  
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === newUser.username) {
        alert("Username already exists");
        return;
      }
    }
    const newUsers = [...users, newUser];
    setUsers(newUsers);
    alert("User has been added successfully");
    navigate("/", {
      state: newUsers,
    });
  };  

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.passwordConfirmation) {
      alert("Passwords do not match.");
      return;
    }
    addUser(values);
  };

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Full Name",
      errorMessage:
        "Full name must be 3-16 characters long, can contain only English letters.",
      label: "Full Name",
      pattern: "^[ a-zA-Z]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "username",
      type: "text",
      placeholder: "username",
      errorMessage:
        "username must be 3-16 characters long, it contains only English letters and numbers.",
      label: "username",
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
      errorMessage:
        "password must be between 8-16 characters long, contain at least one number, " +
        "one uppercase and one lowercase letter and one special character.",
      label: "Password",
      pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$",
      required: true,
    },
    {
      id: 5,
      name: "passwordConfirmation",
      type: "password",
      placeholder: "Password Confirmation",
      errorMessage: "Passwords do not match.",
      label: "Password Confirmation",
      required: true,
    },
    {
      id: 6,
      name: "profilePic",
      type: "file",
      label: "profile Picture",
      required: true,
    },
  ];

  const onChange = (e) => {
    if (e.target.name === 'profilePic') {
      setValues({ ...values, [e.target.name]: e.target.files[0] });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  console.log(values);

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Web Book.</h1>
          <span>Already have an account?</span>
          <Link to="/">
            <button>Login</button>
          </Link>
        </div>
        <div className="left">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
          {inputs.map((input) => {
            const inputProps = { ...input, onChange };
            if (input.type !== 'file') {
              inputProps.value = values[input.name];
            }
            return <RegInput key={input.id} {...inputProps} />;
            })}
            <button id="registerBtn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
