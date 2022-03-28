import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function EditUser() {
  const [uid, setUid] = useState("");
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Password");
  const [confirmPassword, setConfirmPassword] = useState("Confirm Password");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    getUser();
  }, [uid]);

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
  }, [user]);

  const docRef = collection(db, "users");
  const q = query(docRef, where("uid", "==", `${uid}`));

  const getUser = async () => {
    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      setUser(doc.data());
    });
  };

  const updateProfile = async () => {
    const docRef = doc(db, "users", uid);
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      await updateDoc(docRef, {
        username: username,
        email: email,
        password: password,
      });
      navigate("/profile");
    }
  };

  return (
    <div>
      <div style={{ color: "white" }}>Edit User</div>
      <div>
        <input
          placeholder={user.username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          placeholder={user.email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          type="password"
          placeholder={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <button onClick={() => updateProfile()}>Save</button>
        <button onClick={() => navigate("/profile")}>Cancel</button>
      </div>
    </div>
  );
}
