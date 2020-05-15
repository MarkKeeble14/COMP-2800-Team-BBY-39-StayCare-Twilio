import React, { useState, useContext } from "react";
import { firebase } from "./js/firebase"
import { db } from "./js/firebase"
import { generateUserDocument } from "./js/firebase"

const AuthContext = React.createContext(null);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");

  const Auth = useContext(AuthContext);
  const handleForm = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        generateUserDocument(res.user)
        .then(result => function() {
          db.collection('users').add(result);
        }).then(res => {
            window.location.replace("./");
        });
      })
      .catch(e => {
        setErrors(e.message);
      });
  };

  return (
    <div>
      <h1>Sign Up Now!</h1>
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

        <span>{error}</span>
      </form>
    </div>
  );
};

export default SignUp;