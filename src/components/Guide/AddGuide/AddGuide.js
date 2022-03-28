import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import Body from './Body/Body'
import Head from './Head/Head'
import './guide.css'

export default function AddGuide() {
  // Hoisting Head, refactor
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [urls, setUrls] = useState([])
  const [APIs, setAPIs] = useState([])
  const [frontEnds, setFrontEnds] = useState([])
  const [backEnds, setBackEnds] = useState([])

  // Constants for Setting FireStore Guide
  // const tag = tags.map((tag) => {
  // 	return tag;
  // });
  // const url = urls.map((url) => {
  // 	return url;
  // });
  // const API = APIs.map((API) => {
  // 	return API;
  // });
  // const frontEnd = frontEnds.map((frontEnd) => {
  // 	return frontEnd;
  // });
  // const backEnd = backEnds.map((backEnd) => {
  // 	return backEnd;
  // })

  //////////////////////////////

  // Hooks & Variables
  const [currentUid, setCurrentUid] = useState('')
  const [user, setUser] = useState({})
  const [disable, setDisable] = useState(false)
  const [guideId, setGuideId] = useState('')
  const [save, setSave] = useState(false)
  const [submit, setSubmit] = useState(false)

  const navigate = useNavigate()
  const username = user.username
  const userId = user.uid

  // Get current UserID from FireAuth
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const uid = user.uid
      setCurrentUid(uid)
    })
    myQuery()
  }, [currentUid])

  // Get current User from FireStore
  const docRef = collection(db, 'users')
  const q = query(docRef, where('uid', '==', currentUid))

  const myQuery = async () => {
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setUser(doc.data())
    })
  }

  // Create new Guide Doc
  useEffect(() => {
    const myDoc = async () => {
      const mydocRef = await addDoc(collection(db, 'guides'), {
        isPublished: false,
        createdAt: serverTimestamp(),
      })
      setGuideId(mydocRef.id)
      return mydocRef
    }
    myDoc()
  }, [])

  const setOwner = async () => {
    const guideRef = doc(db, 'guides', guideId)
    await updateDoc(guideRef, {
      userId,
      username,
    })
    const q = query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid))
    const qS = await getDocs(q)
    const profileId = qS.docs[0].id
    await updateDoc(doc(db, 'profiles', profileId), {
      guides: arrayUnion(guideId),
    })
    console.log('setting owner')
  }

  const isPublished = async () => {
    const guideRef = doc(db, 'guides', guideId)
    await updateDoc(guideRef, {
      userId,
      username,
      isPublished: true,
    })
    const q = query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid))
    const qS = await getDocs(q)
    const profileId = qS.docs[0].id
    await updateDoc(doc(db, 'profiles', profileId), {
      guides: arrayUnion(guideId),
    })
    console.log('setting published')
  }

  useEffect(() => {
    setSave(false)
    if (save === true) setOwner()
  }, [save])

  useEffect(() => {
    setSubmit(false)
    if (submit === true) {
      isPublished()
      navigate('/')
    }
  }, [submit])

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <form>
      <div className="postHeader" style={{ backgroundColor: 'red' }}>
        <Head
          guideId={guideId}
          save={save}
          submit={submit}
          titleChild={(data) => setTitle(data)}
          tagChild={(data) => setTags(data)}
          urlChild={(data) => setUrls(data)}
          descriptionChild={(data) => setDescription(data)}
          apiChild={(data) => setAPIs(data)}
          frontEndChild={(data) => setFrontEnds(data)}
          backEndChild={(data) => setBackEnds(data)}
        />
      </div>
      <div className="post">
        <Body guideId={guideId} save={save} submit={submit} />
      </div>

      <div>
        <button type="button" onClick={handleCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="button" onClick={() => setSave(true)} className="save-btn">
          Save Draft
        </button>
        <button type="submit" onClick={() => setSubmit(true)} className="submit-btn">
          Post Guide
        </button>
      </div>
    </form>
  )
}
