import { useState, useEffect } from 'react'
import Body from './Body/Body'
import Head from './Head/Head'
import { useNavigate } from 'react-router-dom'
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore'
import { db, auth } from '../../../firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function AddGuide() {
  // User
  const [currentUid, setCurrentUid] = useState('')
  const [user, setUser] = useState({})

  // Head
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [urls, setUrls] = useState([])
  const [APIs, setAPIs] = useState([])
  const [frontEnds, setFrontEnds] = useState([])
  const [backEnds, setBackEnds] = useState([])

  // Body
  const [allFiles, setAllFiles] = useState([])
  const [language, setLanguage] = useState([])
  const [code, setCode] = useState([])

  // Get current UserID from Auth
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const uid = user.uid
      setCurrentUid(uid)
    })
    myQuery()
  }, [currentUid])

  // Get current User from Firestore
  const docRef = collection(db, 'users')
  const q = query(docRef, where('uid', '==', currentUid))

  const myQuery = async () => {
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setUser(doc.data())
    })
  }

  // Constants for Setting FireStore Guide
  // User
  const username = user.name
  const userId = user.uid

  // Head
  const tag = tags.map((tag) => tag)
  const url = urls.map((url) => url)
  const API = APIs.map((API) => API)
  const frontEnd = frontEnds.map((frontEnd) => frontEnd)
  const backEnd = backEnds.map((backEnd) => backEnd)

  // Body
  const files = allFiles.map((fileName) => {
    return { fileName, language, code }
  })

  // Set FireStore Guide
  const setGuide = async () => {
    const guideRef = await addDoc(collection(db, 'guides'), {
      files,
      apis: API,
      backEnd,
      description,
      frontEnd,
      githubUrl: url,
      tags: tag,
      title,
      userId: userId,
      username: username,
      favorites: 0,
      isPublished: false,
      createdAt: serverTimestamp(),
    })
    console.log('this is new saved doc ', guideRef.path)
    navigate(`/guide/${guideRef.id}`)
  }
  // Publish FireSTore Guide
  const publishGuide = async () => {
    const guideRef = await addDoc(collection(db, 'guides'), {
      files,
      apis: API,
      backEnd,
      description,
      frontEnd,
      githubUrl: url,
      tags: tag,
      title,
      userId: userId,
      username: username,
      favorites: 0,
      isPublished: true,
      createdAt: serverTimestamp(),
    })
    console.log('this is new published doc ', guideRef.path)
    navigate(`/guide/${guideRef.id}`)
  }
  // Handle Buttons
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/')
  }

  const handleSave = (e) => {
    e.preventDefault()
    setGuide()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    publishGuide()
  }

  return (
    <form style={{ border: '1rem solid pink' }}>
      <div className="postHeader" style={{ backgroundColor: 'red' }}>
        <Head
          titleChild={(data) => setTitle(data)}
          tagChild={(data) => setTags(data)}
          urlChild={(data) => setUrls(data)}
          descriptionChild={(data) => setDescription(data)}
          apiChild={(data) => setAPIs(data)}
          frontEndChild={(data) => setFrontEnds(data)}
          backEndChild={(data) => setBackEnds(data)}
        />
      </div>
      <div style={{ backgroundColor: 'blue' }} className="post">
        <Body
          fileChild={(data) => setAllFiles(data)}
          languageChild={(data) => setLanguage(data)}
          codeChild={(data) => setCode(data)}
        />
      </div>

      <div style={{ backgroundColor: 'pink' }}>
        <button type="button" onClick={handleCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" onClick={(e) => handleSave(e)} className="save-btn">
          Save
        </button>
        <button type="submit" onClick={(e) => handleSubmit(e)} className="submit-btn">
          Submit
        </button>
      </div>
    </form>
  )
}
