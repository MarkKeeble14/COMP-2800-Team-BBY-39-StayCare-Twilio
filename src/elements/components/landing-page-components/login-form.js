import React, { useState, useContext } from "react";
import { firebase } from "../../js/firebase"
import "../../css/temp.css"
const AuthContext = React.createContext(null);

// The Login form used within the 'form-area' component.
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);

  // On submit, attempt to sign in to the account that matches the given email and password.
  const handleForm = e => {
    e.preventDefault();
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      // Reload window
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