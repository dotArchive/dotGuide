import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { Box } from '@mui/system'
import { Button, Card, TextField, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'

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

  useEffect(() => {
    setUsername(user.username)
    setEmail(user.email)
    setPassword(user.password)
  }, [user])

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
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
    } else {
      await updateDoc(docRef, {
        username: username,
        email: email,
        password: password,
      })
      navigate('/profile')
    }
  }

  /*** styles  start ***/
  const outerBox = {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '50%',
    ml: 'auto',
    mr: 'auto',
  }
  const editUserOuterCard = {
    display: 'flex',
    flexDirection: 'column',
    background: '#2f2f2f',
    p: 1,
    pl: 2,
    pr: 2,
    // mr: 1,
    width: '25%',
    minHeight: '10vh',
    textOverflow: 'ellipsis',
    border: 1.25,
    borderColor: '#353540',
    flexGrow: 1,
  }
  const editUserTextField = {
    pb: 1,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        borderRadius: 3,
        mt: 0.5,
        mb: 0.5,
      },
      '& adornedEnd': {
        pr: 0,
      },
    },
  }

  return (
    <Box sx={outerBox}>
      <Card sx={editUserOuterCard}>
        <Typography variant="h3" sx={{ pt: 2, pb: 3, color: 'white', textAlign: 'center' }}>
          Edit User
        </Typography>
        <TextField
          sx={editUserTextField}
          size="small"
          variant="outlined"
          label={user.username}
          onChange={(e) => setUsername(e.target.value)}></TextField>
        <TextField
          sx={editUserTextField}
          size="small"
          variant="outlined"
          label={user.email}
          onChange={(e) => setEmail(e.target.value)}></TextField>
        <TextField
          sx={editUserTextField}
          size="small"
          variant="outlined"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}></TextField>
        <TextField
          sx={editUserTextField}
          size="small"
          variant="outlined"
          type="password"
          label={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}></TextField>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => navigate('/profile')}>
            <ArrowBackIcon sx={{ color: 'gray' }} />
          </Button>
          <Button onClick={() => updateProfile()}>
            <CheckCircleOutlineIcon sx={{ color: "#468ef3", fontSize: 28, }} />

          </Button>
        </Box>
      </Card>
    </Box>
  )
}
