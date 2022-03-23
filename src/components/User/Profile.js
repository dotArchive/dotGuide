import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [currentUid, setCurrentUid] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrentUid(uid);
      }
    });

    myQuery();
  }, [currentUid]);

  const myQuery = async () => {
    const docRef = collection(db, "users");
    const q = query(docRef, where("uid", "==", currentUid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };

  return (
    <div>
      <div>Username: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>
        <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
