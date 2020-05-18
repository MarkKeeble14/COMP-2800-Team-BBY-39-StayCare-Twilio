import React, { useState, useContext } from "react";
import { firebase } from "./js/firebase"
import { Link } from "gatsby"
import "./css/temp.css"
const AuthContext = React.createContext(null);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const handleForm = e => {
    e.preventDefault();
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res)
      console.log(res.user.displayName);
      window.location.replace("./");
    })
    .catch(e => {
      setErrors(e.message);
    });
  };

  return (
    <form onSubmit={e => handleForm(e)} className="signup-form" id="login-form">
      <h2>Welcome Back</h2>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        name="email"
        type="email"
        placeholder="email"
      />
        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <br/>
        <div className="box">
            <input type="submit" className="btn btn-white btn-animation-1" value="Login"/>
        </div>
        <span>{error}</span>
        <h4>or</h4>
      </form>
  );
};

export default Login;