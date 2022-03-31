//react imports
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//firebase imports
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../../../firebase'

//mui imports
import Body from './Body/Body'
import Head from './Head/Head'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveIcon from '@mui/icons-material/Save'
import SendIcon from '@mui/icons-material/Send'

export default function AddGuide(props) {
  /*** Hooks ***/
  const navigate = useNavigate()
  let { guideId } = useParams()

  //user auth
  const [currentUid, setCurrentUid] = useState('')
  //data state
  const [user, setUser] = useState({})
  const [guide, setGuide] = useState({})
  //saving state to db
  const [save, setSave] = useState(false)
  const [submit, setSubmit] = useState(false)

  //useEffects
  useEffect(() => {}, [])

  /*** Get current UserID from FireAuth ***/
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const uid = user.uid
      setCurrentUid(uid)
      setUser(user)
    })
    if (currentUid.length) {
      const getGuide = async () => {
        const docSnap = await getDoc(doc(db, 'guides', guideId))
        if (docSnap.exists()) {
          setGuide(docSnap.data())
        } else {
          console.log(`unable to get guide!`)
        }
      }
      getGuide()
    }
  }, [currentUid])

  useEffect(() => {
    setSave(false)
  }, [save])

  useEffect(() => {
    setSubmit(false)
    if (submit === true) {
      /*** Updates FireStore & Publish to True ***/
      const isPublished = async () => {
        const guideRef = doc(db, 'guides', guideId)
        await updateDoc(guideRef, { isPublished: true })
      }
      isPublished()
      navigate('/')
    }
  }, [submit])

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <form>
      <div className="post">
        <Head
          guide={guide}
          username={guide.username}
          guideId={guideId}
          save={save}
          submit={submit}
        />
      </div>
      <div className="post">
        <Body guide={guide} guideId={guideId} save={save} submit={submit} />
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 5, pb: 5 }}>
        <Button onClick={handleCancel}>
          <ArrowBackIcon sx={{ color: 'gray', fontSize: 36 }} onClick={() => navigate('/')} />
        </Button>
        <Button onClick={() => setSave(true)}>
          <SaveIcon sx={{ color: '#468ef3', fontSize: 36, pl: 5, pr: 5 }} />
        </Button>
        <Button>
          <SendIcon sx={{ color: '#468ef3', fontSize: 36 }} onClick={() => setSubmit(true)} />
        </Button>
      </Box>
    </form>
  )
}
