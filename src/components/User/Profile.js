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

  // Get User from firebase Auth
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    myDoc();
  }, [uid]);

  const docRef = collection(db, 'users');
	const q = query(docRef, where('uid', '==', `${uid}`));

  const myDoc = async () => {
    const docSnap = await getDocs(q);

		docSnap.forEach((doc) => {
			setUser(doc.data());
		});
  };

  console.log(user)

  return (
    <div>
      <div style={{ color: "white" }}>Username: {user.username}</div>
      <div style={{ color: "white" }}>Email: {user.email}</div>
      <div>
        <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
