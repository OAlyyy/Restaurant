import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "universal-cookie";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // User is logged in successfully
        // The onAuthStateChanged listener will handle the state update
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  };

  useEffect(() => {
    const cookies = new Cookies();
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        cookies.set("jwt_authorization", user.uid);
        navigate("/");
      } else {
        // User is logged out
        cookies.remove("jwt_authorization");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="loginParent">
      <div className="loginContainer">
        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
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

    </div>
  );
}

export default Login;
