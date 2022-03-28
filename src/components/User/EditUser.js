import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import {
  updateEmail,
  updateProfile,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
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
    await updateDoc(docRef, {
      username: username,
      email: email,
      password: password,
    });
    navigate("/profile");
  };

  // const myQuery = async () => {
  //   const docRef = collection(db, "users");
  //   const q = query(docRef, where("uid", "==", currentUid));
  //   const querySnapshot = await getDocs(q);

  //   querySnapshot.forEach((doc) => {
  //     setUser(doc.data());
  //   });
  // };

  // console.log(user.id)

  // const handleClick = () => {
  //   if (!username) {
  //     alert("Username is required");
  //   } else if (!email) {
  //     alert("Email is required");
  //   } else if (!password) {
  //     alert("Password is required");
  //   } else {
  //     updateProfile()
  //   }
  // }

  return (
    <div>
      <div style={{color: "white"}}>Edit User</div>
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
      {/* <div>
        <input
          placeholder={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
      </div> */}
      <div>
        <button onClick={() => updateProfile()}>Save</button>
        <button onClick={() => navigate("/profile")}>Cancel</button>
      </div>
    </div>
  );
}
