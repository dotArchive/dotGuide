//react imports
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//firebase imports
import { db, auth } from '../../firebase'
import {
  collection,
  getDocs,
  where,
  query,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

//mui imports
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import EditIcon from '@mui/icons-material/Edit'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

//components
import UserGuidePreview from './UserGuidePreviews'

const Profile = () => {
  const navigate = useNavigate()

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

  // useEffects start here
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
      }
    })
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
    const getProfile = () => {
      const makeProfile = async () => {
        await addDoc(collection(db, 'profiles'), {
          createdAt: serverTimestamp(),
          email: user.email,
          userId: uid,
          isAdmin: false,
          isBanned: false,
          guides: [],
          githubUrl: '',
          favorites: [],
          username: user.username,
        })
      }
      const myProfile = async () => {
        const profileRef = collection(db, 'profiles')
        const q = query(profileRef, where('userId', '==', uid))
        const qS = await getDocs(q)
        qS.length ? qS.forEach((doc) => setProfile(doc.data())) : makeProfile()
      }
      myProfile()
    }
    getUser()
    getGuides()
    getProfile()
  }, [uid])

  useEffect(() => {
    const getFavorites = () => {
      const myFavorites = async () => {
        const favoritesArr = []
        let favorites = profile.favorites
        favorites.forEach(async (favorite) => {
          const guideRef = doc(db, 'guides', favorite)
          const gS = await getDoc(guideRef)
          return gS.exists() ? favoritesArr.push(gS.data()) : null
        })
        setFavorites(favoritesArr)
      }
      myFavorites()
    }
    getFavorites()
  }, [profile])

  //combiners for passing props
  const guideProps = { guides: guides, list: profile.guides }
  const favProps = { guides: favorites, list: profile.favorites }

  /*** styles start here ***/
  const outerBox = {
    display: 'flex',
    flexDirection: 'column',
  }
  const profileTopCard = {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    background: '#2f2f2f',
    p: 1,
    px: 2,
    mb: 5,
    minHeight: 50,
    textOverflow: 'ellipsis',
    border: 1.25,
    borderColor: '#353540',
  }
  const profileTypography = {
    pt: 2,
    pb: 3,
    color: 'white',
    textAlign: 'center',
  }
  const usernameTypography = {
    mt: 0.75,
    mb: 0.5,
    pr: 2,
    color: 'white',
  }
  const profileTopCardText = {
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
  const emailTypography = {
    mt: 1,
    mb: 0.75,
    pr: 6.25,
    color: 'white',
  }
  const newGuideButton = {
    width: '25%',
    alignSelf: 'center',
    my: 1,
  }
  const guideListsOuterBox = {
    display: 'flex',
    alignSelf: 'space-around',
    flowDirection: 'row',
    // justifyContent: 'center',
  }
  const guideListsBox = {
    ml: 0.5,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  }
  const guidesListsTypography = {
    color: 'white',
    my: 1,
    fontSize: '2em',
    alignSelf: 'center',
  }
  const openButtonStyles = {
    borderRadius: 1,
    mb: 0.5,
    width: '50%',
    alignSelf: 'center',
  }

  return (
    <>
      <Box sx={outerBox}>
        {/*** start profile top card ***/}

        <Card sx={profileTopCard}>
          <Typography variant="h3" sx={profileTypography}>
            Profile
          </Typography>
          {/*** username field ***/}
          <Box sx={{ display: 'flex' }}>
            <Typography sx={usernameTypography}>Username:</Typography>
            <TextField
              sx={profileTopCardText}
              disabled={true}
              size="small"
              variant="outlined"
              label={user.username}
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            {/*** email field ***/}
            <Typography sx={emailTypography}>Email:</Typography>
            <TextField
              sx={profileTopCardText}
              disabled={true}
              size="small"
              variant="outlined"
              label={user.email}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => navigate('/edit-profile')}>
              <EditIcon sx={{ color: '#468ef3' }} />
            </Button>
          </Box>
        </Card>

        {/*** new guide button ***/}
        <Button sx={newGuideButton} variant="contained" onClick={() => navigate('/guide/add')}>
          Create New Guide
        </Button>

        {/*** start guide lists ***/}
        <Box sx={guideListsOuterBox}>
          <Box sx={guideListsBox}>
            <Typography variant="h3" sx={guidesListsTypography}>
              My Guides
            </Typography>
            {!guidesOpen ? (
              <>
                {/*** open button for user owned guides ***/}
                <Button
                  sx={openButtonStyles}
                  variant="contained"
                  onClick={() => {
                    setGuidesOpen(!guidesOpen)
                  }}>
                  See Guides
                </Button>
              </>
            ) : (
              <>
                {/*** close button for user owned guides ***/}
                <Button
                  sx={openButtonStyles}
                  variant="contained"
                  onClick={() => {
                    setGuidesOpen(!guidesOpen)
                  }}>
                  Close Guides
                </Button>
                <UserGuidePreview props={guideProps} />
              </>
            )}
          </Box>
          <Box sx={guideListsBox}>
            <Typography variant="h3" sx={guidesListsTypography}>
              My Favorites
            </Typography>
            {!favoritesOpen ? (
              <>
                {/*** open button for favs ***/}
                {profile.favorites ? (
                  <Button
                    sx={openButtonStyles}
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
                {/*** close button for favs ***/}
                <Button
                  sx={openButtonStyles}
                  variant="contained"
                  onClick={() => {
                    setFavoritesOpen(!favoritesOpen)
                  }}>
                  Close Favorites
                </Button>
                <UserGuidePreview props={favProps} />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Profile
