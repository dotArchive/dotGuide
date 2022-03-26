import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebase'
import { collection, getDocs, where, query, getDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { Button } from '@mui/material'

const Profile = () => {
  const [user, setUser] = useState({})
  const [uid, setUid] = useState('')
  const navigate = useNavigate()

  const myDoc = async () => {
    const docRef = doc(db, 'users', `${uid}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setUser(docSnap.data())
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUid = user.uid
        setUid(userUid)
      }
    })
  }, [])

  useEffect(() => {
    myDoc()
  }, [uid])

  return (
    <div>
      {console.log(user)}
      <div>Username: {user.username}</div>
      <div>Email: {user.email}</div>
      <div>
        <Button onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
      </div>
    </div>
  )
}

export default Profile
