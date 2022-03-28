import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase'
import {
  // updateEmail,
  // updateProfile,
  // updatePassword,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  // setDoc,
  // getDoc,
} from 'firebase/firestore'

export default function EditUser() {
  const [uid, setUid] = useState('')
  const [user, setUser] = useState({})
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('Password')
  const [confirmPassword, setConfirmPassword] = useState('Confirm Password')
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
      }
    })
    getUser()
  }, [uid])

  const docRef = collection(db, 'users')
  const q = query(docRef, where('uid', '==', `${uid}`))

  const getUser = async () => {
    const docSnap = await getDocs(q)

    docSnap.forEach((doc) => {
      setUser(doc.data())
    })
  }

  const updateProfile = async () => {
    const docRef = doc(db, 'users', uid)
    await updateDoc(docRef, {
      username: username,
      email: email,
      password: password,
    })
    navigate('/profile')
  }

  // const myQuery = async () => {
  //   const docRef = collection(db, "users");
  //   const q = query(docRef, where("uid", "==", currentUid));
  //   const querySnapshot = await getDocs(q);

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
        <input placeholder={user.username} onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div>
        <input placeholder={user.email} onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div>
        <input placeholder={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <div>
        <input
          placeholder={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}></input>
      </div>
      <div>
        <button onClick={() => updateProfile()}>Save</button>
        <button onClick={() => navigate('/profile')}>Cancel</button>
      </div>
    </div>
  )
}
