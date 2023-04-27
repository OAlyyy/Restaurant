import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // import Navigate
import Cookies from "universal-cookie";
function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  // eslint-disable-next-line
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/user/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {


       
        cookies.set("jwt_authorization",response.data.token,{
        })

        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/"); // navigate to the home page
      }
    });
  };

  return (
    <div className="loginParent">
      <div className="loginContainer">
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={login}> Login </button>
      </div>

      <div>Dont have an account yet ? Click  <a href="/register">here</a> </div>
      
    </div>
  );
}

export default Login;
