import { useEffect, useState } from "react";
import "./register.css";
import RegInput from "../../Components/RegIn/RegInput.js";
import usersExsist from "../../data/Users.json";
import { Link, useNavigate } from "react-router-dom";
import RegInputs from "../../data/RegInputs.json";

const Register = () => {
  // const [users, setUsers] = useState(usersExsist);
  const navigate = useNavigate();
  const inputs = RegInputs;

  // useEffect(() => {
  //   setUsers(usersExsist);
  // }, []);

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    profilePic: "",
  });

  const onChange = (e) => {
    if (e.target.name === "profilePic") {
      setValues({ ...values, [e.target.name]: URL.createObjectURL(e.target.files[0])});
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.passwordConfirmation) {
      alert("Passwords do not match.");
      return;
    }
    handleSubmit();
  };

  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:12345/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"name": values.name, "username": values.username, "password": values.password, "profilePic": values.profilePic}),
    });

    if (response["status"] === 409) {
      alert("User already exists");
    } else {
      alert("User has been added successfully");
      navigate("/");
    }
  };

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
          <form
            onSubmit={validateAndSubmit}
            method="post"
          >
            {inputs.map((input) => {
              const inputProps = { ...input, onChange };
              if (input.type !== "file") {
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
