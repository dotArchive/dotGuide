//react imports
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//firebase imports
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
  deleteDoc,
  arrayRemove,
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
import DeleteIcon from '@mui/icons-material/Delete'

export default function AddGuide(props) {
  /*** Hooks ***/
  const navigate = useNavigate()
  let { guideId } = useParams()

  //user auth
  const [currentUid, setCurrentUid] = useState('')

  //data state
  const [user, setUser] = useState({})
  const [guide, setGuide] = useState({})
  const [profile, setProfile] = useState({})
  const [profileId, setProfileId] = useState('')

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
    const getProfile = async () => {
      if (Object.keys(guide).length) {
        const docRef = collection(db, 'profiles')
        const q = query(docRef, where('userId', '==', currentUid))
        const qSnap = await getDocs(q)
        qSnap.forEach((doc) => {
          setProfile(doc.data())
          setProfileId(doc.id)
        })
      } else {
        console.log('Cannot get profile')
      }
    }
    if (Object.keys(guide).length) {
      getProfile()
    }
  }, [guide])

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
      navigate(`/guide/publish/${guideId}`)
    }
  }, [submit])

  const deleteProfileGuide = async () => {
    const profileRef = doc(db, 'profiles', profileId)
    console.log(profileRef)
    await updateDoc(profileRef, {
      guides: arrayRemove(guideId),
    })
  }

  const deleteGuide = () => {
    const handleDelete = async () => {
      const docRef = doc(db, 'guides', guideId)
      await deleteDoc(docRef)
      navigate('/profile')
    }
    handleDelete()
  }

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
        <Button
          onClick={() => {
            if (currentUid === guide.userId) setSave(true)
          }}>
          <SaveIcon sx={{ color: '#468ef3', fontSize: 36, pl: 5, pr: 5 }} />
        </Button>
        <Button
          onClick={() => {
            deleteProfileGuide()
            deleteGuide()
          }}>
          <DeleteIcon sx={{ color: '#f44336', fontSize: 36, pl: 5, pr: 5 }} />
        </Button>
        <Button>
          <SendIcon
            sx={{ color: '#468ef3', fontSize: 36 }}
            onClick={() => {
              if (currentUid === guide.userId) setSubmit(true)
            }}
          />
        </Button>
      </Box>
    </form>
  )
}
