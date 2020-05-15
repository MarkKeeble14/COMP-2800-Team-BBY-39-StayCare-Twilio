import React, { useState, useContext } from "react";
import { firebase } from "./js/firebase"
import { Link } from "gatsby"

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
    <div>
      <h1>Login</h1>
      <form onSubmit={e => handleForm(e)}>
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
        <hr />
        <button type="submit">Login</button>
        <Link to="/signup">Don't have an account? Sign up here!</Link>
        <span>{error}</span>
      </form>
    </div>
  );
};

export default Login;