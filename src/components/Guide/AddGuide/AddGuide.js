//react imports
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//firebase imports
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../../../firebase'

//mui imports
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'

// component imports
import Body from './Body/Body'
import Head from './Head/Head'

export default function AddGuide(props) {
  /*** Hooks ***/
  const navigate = useNavigate()

  const [currentUid, setCurrentUid] = useState('')
  const [user, setUser] = useState({})
  const [guideId, setGuideId] = useState('')
  const [save, setSave] = useState(false)
  const [submit, setSubmit] = useState(false)

  /*** useEffects start here ***/
  useEffect(() => {
    /*** Create new Guide Doc in FireStore ***/
    const myDoc = async () => {
      const mydocRef = await addDoc(collection(db, 'guides'), {
        isPublished: false,
        createdAt: serverTimestamp(),
        favorites: 0,
      })
      setGuideId(mydocRef.id)
      return mydocRef
    }
    myDoc()
  }, [])
  useEffect(() => {
    /*** Get current UserID from FireAuth ***/
    onAuthStateChanged(auth, (user) => {
      const uid = user.uid
      setCurrentUid(uid)
    })
    /*** Get current User from FireStore ***/
    const myQuery = async () => {
      const docRef = collection(db, 'users')
      const q = query(docRef, where('uid', '==', currentUid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
    }
    myQuery()
  }, [currentUid])
  useEffect(() => {
    setSave(false)
    if (save === true) setOwner()
  }, [save])
  useEffect(() => {
    setSubmit(false)
    if (submit === true) {
      isPublished()
      navigate(`/guide/publish/${guideId}`)
    }
  }, [submit])

  const username = user.username
  const userId = user.uid

  // firestore
  /*** Sets Owner to new Guide Doc in Firestore ***/
  const setOwner = async () => {
    const guideRef = doc(db, 'guides', guideId)
    await updateDoc(guideRef, {
      userId,
      username,
      createdAt: serverTimestamp(),
    })
    const q = query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid))
    const qS = await getDocs(q)
    const profileId = qS.docs[0].id
    await updateDoc(doc(db, 'profiles', profileId), {
      guides: arrayUnion(guideId),
    })
  }
  /*** Updates FireStore & Publish to True ***/
  const isPublished = async () => {
    const guideRef = doc(db, 'guides', guideId)
    await updateDoc(guideRef, {
      userId,
      username,
      createdAt: serverTimestamp(),
      isPublished: true,
    })
    const q = query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid))
    const qS = await getDocs(q)
    const profileId = qS.docs[0].id
    await updateDoc(doc(db, 'profiles', profileId), {
      guides: arrayUnion(guideId),
    })
  }

  // event handling
  const handleCancel = () => {
    navigate('/')
  }

  // mui style constants
  const outerBox = {
    display: 'flex',
    justifyContent: 'center',
    pt: 5,
    pb: 5,
  }
  const arrowBack = {
    color: 'gray',
    fontSize: 36,
  }
  const saveIcon = {
    color: '#468ef3',
    fontSize: 36,
    pl: 5,
    pr: 5,
  }
  const sendIcon = {
    color: '#468ef3',
    fontSize: 36,
  }

  return (
    <form>
      <div className="post">
        <Head username={username} guideId={guideId} save={save} submit={submit} />
      </div>
      <div className="post">
        <Body guideId={guideId} save={save} submit={submit} />
      </div>

      <Box sx={outerBox}>
        <Button onClick={handleCancel}>
          <ArrowBackIcon sx={arrowBack} onClick={() => navigate('/')} />
        </Button>
        <Button onClick={() => setSave(true)}>
          <SaveIcon sx={saveIcon} />
        </Button>
        <Button>
          <SendIcon sx={sendIcon} onClick={() => setSubmit(true)} />
        </Button>
      </Box>
    </form>
  )
}
