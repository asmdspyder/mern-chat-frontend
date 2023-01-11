import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import ErrorMsg from "../ErrorMsg";
import axios from "axios";
import { Button } from "react-bootstrap";

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        name: user.name,
        password: user.password,
      };

      const loginResponse = await axios.post(
        "https://mernchatbackend-zkx3.onrender.com/api/users/login",
        newUser
      );

      //console.log(loginResponse.data)
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);

      setUser({
        name: "",
        password: "",
      });

      window.location = "/";
    } catch (err) {
      err.response.data.msg
        ? setErrorMsg(err.response.data.msg)
        : setErrorMsg("We have an error!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((oldUser) => {
      return {
        ...oldUser,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <center>
        <h1>Log In</h1>
        <br />
        {errorMsg && <ErrorMsg msg={errorMsg} />}

        <form onSubmit={handleSubmit}>
          <div className="input">
            <label>User Name&nbsp; </label>
            <input
              type="text"
              name="name"
              value={user.name}
              required
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="input">
            <label>Password&nbsp; </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <br />
          <div className="input">
            <Button variant="success" type="submit" size="lg">
              Log In
            </Button>
          </div>
        </form>
      </center>
    </div>
  );
};

export default Login;
