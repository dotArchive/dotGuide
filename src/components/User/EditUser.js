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
	getDoc
} from "firebase/firestore";

export default function EditUser() {
  const [currentUid, setCurrentUid] = useState("");
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Password");
  const [confirmPassword, setConfirmPassword] = useState("Confirm Password");
  const navigate = useNavigate();
  const userAuth = auth.currentUser;

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

	console.log(user.id)

  // const updateFirestoreFields = async () => {
	// 	const translateDoc = doc(db, "translate", "custom_doc_id")
	// 	await setDoc(translateDoc, {
	// 		eng_tot,
	// 		sank_tot
	// 	});  };

  return (
    <div>
      <div>Edit User</div>
      <div>
        <input
          placeholder={user.name}
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
          placeholder={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          placeholder={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
      </div>
      <div>
        {/* <button onClick={updateFirestoreFields}>Save</button> */}
        <button onClick={() => navigate("/profile")}>Cancel</button>
      </div>
    </div>
  );
}
