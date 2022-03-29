import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebase'
import { collection, getDocs, where, query, getDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import UserGuidePreview from './UserGuidePreviews'

const Profile = () => {
  // data fetching
  const [user, setUser] = useState({})
  const [uid, setUid] = useState('')
  const [profile, setProfile] = useState({})
  //guides and favorites lists
  const [guides, setGuides] = useState([])
  const [favorites, setFavorites] = useState([])
  //toggles for opening and closing guides and favorites lists
  const [guidesOpen, setGuidesOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const navigate = useNavigate()

  // Get User from firebase Auth
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
      }
    })
    getUser()
    getGuides()
    getProfile()
  }, [uid])

  useEffect(() => {
    getFavorites()
  }, [profile])

  const getUser = () => {
    const myDoc = async () => {
      const docRef = collection(db, 'users')
      const q = query(docRef, where('uid', '==', `${uid}`))
      const docSnap = await getDocs(q)
      docSnap.forEach((doc) => {
        setUser(doc.data())
      })
    }
    myDoc()
  }
  const getGuides = () => {
    const myGuides = async () => {
      const guidesArr = []
      const guideRef = collection(db, 'guides')
      const q = query(guideRef, where('userId', '==', uid))
      const qS = await getDocs(q)
      qS.forEach((doc) => {
        guidesArr.push(doc.data())
      })
      setGuides(guidesArr)
    }
    myGuides()
  }

  const getFavorites = () => {
    const myFavorites = async () => {
      const favoritesArr = []
      let favorites = profile.favorites
      console.log(profile.favorites)
      favorites.forEach(async (favorite) => {
        const guideRef = doc(db, 'guides', favorite)
        const gS = await getDoc(guideRef)
        return gS.exists() ? favoritesArr.push(gS.data()) : null
      })
      setFavorites(favoritesArr)
    }
    myFavorites()
  }

  const getProfile = () => {
    const myProfile = async () => {
      const profileRef = collection(db, 'profiles')
      const q = query(profileRef, where('userId', '==', uid))
      const qS = await getDocs(q)
      qS.forEach((doc) => {
        setProfile(doc.data())
      })
    }
    myProfile()
  }

  return (
    <Container>
      <Card sx={{ borderRadius: 1, border: 1.25, borderColor: '#353540' }}>
        <CardContent sx={{ color: 'white', bgcolor: '#2f2f2f' }}>
          <Typography sx={{ mb: 0.5 }}>Username: {user.username}</Typography>
          <Typography sx={{ mb: 0.5 }}>Email: {user.email}</Typography>
          <Typography>
            <Button
              sx={{ borderRadius: 1 }}
              variant="contained"
              onClick={() => navigate('/edit-profile')}>
              Edit Profile
            </Button>
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', flowDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ mr: 0.5, width: '100%' }}>
          <Typography variant="h3" sx={{ color: 'white', ml: 2, my: 1, fontSize: '2em' }}>
            My Guides
          </Typography>
          {!guidesOpen ? (
            <>
              <Button
                sx={{ borderRadius: 1 }}
                variant="contained"
                onClick={() => {
                  setGuidesOpen(!guidesOpen)
                }}>
                See Guides
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{ borderRadius: 1 }}
                variant="contained"
                onClick={() => {
                  setGuidesOpen(!guidesOpen)
                }}>
                Close Guides
              </Button>
              <UserGuidePreview props={guides} />
            </>
          )}
        </Box>
        <Box sx={{ ml: 0.5, width: '100%' }}>
          <Typography variant="h3" sx={{ color: 'white', ml: 2, my: 1, fontSize: '2em' }}>
            My Favorites
          </Typography>
          {!favoritesOpen ? (
            <>
              {profile.favorites ? (
                <Button
                  sx={{ borderRadius: 1 }}
                  variant="contained"
                  onClick={() => {
                    setFavoritesOpen(!favoritesOpen)
                  }}>
                  See Favorites
                </Button>
              ) : null}
            </>
          ) : (
            <>
              <Button
                sx={{ borderRadius: 1 }}
                variant="contained"
                onClick={() => {
                  setFavoritesOpen(!favoritesOpen)
                }}>
                Close Favorites
              </Button>
              <UserGuidePreview props={favorites} />
            </>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default Profile
