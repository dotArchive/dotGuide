import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const signup = () => {
    if (!username) alert("Please enter name");
    registerWithEmailAndPassword(username, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/profile");
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="USERNAME"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="EMAIL"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="PASSWORD"
        />
        <button className="register__btn" onClick={signup}>
          Register
        </button>
        {/* <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button> */}
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
};

export default Signup;
