import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { DataContext } from "../../context/dataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
function Login() {
  let navigate = useNavigate();

  const { setUserRole } = useContext(DataContext);
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const onSubmit = () => {
    axios
      .post("http://localhost:8080/api/users/login", {
        email: userName,
        password: password,
      })
      .then(function (response) {
        const changUserName = {
          userRole: response.data,
        };
        setUserRole(changUserName);
        localStorage.setItem("userRole", JSON.stringify(changUserName));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(userName, password, "submiteed!");
  };

  function handleChangeUser(event) {
    setuserName(event.target.value);
  }

  function handleChangePassword(event) {
    setpassword(event.target.value);
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <form>
          <p>Username</p>
          <input
            type="text"
            className="input"
            onChange={handleChangeUser}
            value={userName}
          />
          <p>Password</p>
          <input
            type="password"
            onChange={handleChangePassword}
            value={password}
          />
          <div onClick={() => onSubmit()}>Submit</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
