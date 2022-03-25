
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  where,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState({});
  const [uid, setUid] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid;
        setUid(userUid);
      }
    });
  }, []);

  const myDoc = async () => {
    const docRef = doc(db, "users", `${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    }
  };

  myDoc();

  return (
    <div>
      <div>Username: {user.username}</div>
      <div>Email: {user.email}</div>
      <div>
        <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
