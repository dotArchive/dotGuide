import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from 'firebase/firestore'
import { db, auth } from '../../../firebase'
import {
  Typography,
  Box,
  IconButton,
  Button,
  Card,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded'
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp'
import CodeIcon from '@mui/icons-material/Code'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeMirror from './CodeMirror'

export default function SingleGuide() {
  const navigate = useNavigate()
  //useStates
  const [guide, setGuide] = useState({})
  const [profile, setProfile] = useState({})
  const [isFavorite, setIsFavorite] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [showBody, setShowBody] = useState(false)
  const [favorites, setFavorites] = useState(0)
  const [file, setFile] = useState(0)

  //other constants
  const { guideId } = useParams()
  const { frontEnd, backEnd, tags, API, languages, username, title, createdAt, description } = guide
  // const { codeBlock, content, filepath, language } = guide.body

  // getters, checkers, and setters start here
  const getGuide = async () => {
    const docRef = doc(db, 'guides', guideId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setGuide(docSnap.data())
    } else {
      console.log(`unable to get guide!`)
    }
  }
  const setGuidePublished = async () => {
    // //option 1
    // await setDoc(doc(db, 'guides', guideId), {...guide, isPublished: true})

    // option 2
    const guideRef = doc(db, 'guides', guideId)
    setDoc(guideRef, { isPublished: true }, { merge: true })
  }

  const setProfileFavorite = async () => {
    const qS = await getDocs(
      query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid))
    )
    const profileId = qS.docs[0].id
    await updateDoc(doc(db, 'profiles', profileId), {
      favorites: arrayUnion(guideId),
    })
    await updateDoc(doc(db, 'guides', guideId), { favorites: increment(1) })
    setFavorites(favorites + 1)
  }

  const removeProfileFavorite = async () => {
    const qS = await getDocs(
      query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid))
    )
    const profileId = qS.docs[0].id
    await updateDoc(doc(db, 'profiles', profileId), {
      favorites: arrayRemove(guideId),
    })
    await updateDoc(doc(db, 'guides', guideId), { favorites: increment(-1) })

    setFavorites(favorites - 1)
  }
  const favChecker = () => {
    if (Object.keys(profile).length) {
      profile.favorites.forEach((fav) => {
        if (fav === guideId) {
          setIsFavorite(true)
        }
      })
    }
  }
  const ownerChecker = () => {
    if (Object.keys(profile).length) {
      profile.guides.forEach((guide) => {
        if (guide === guideId) {
          setIsOwner(true)
        }
      })
    }
  }
  const getProfile = async () => {
    if (Object.keys(guide).length) {
      const q = query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid))
      const qS = await getDocs(q)
      qS.forEach((doc) => {
        setProfile(doc.data())
      })
    } else {
      console.log('try profile again')
    }
  }
  const editGuide = (e) => {
    //editGuide is event handler for sending you to the edit guide page for this guide
    e.preventDefault()
    navigate(`/guide/edit/${guideId}`)
  }
  const publishChecker = () => {
    if (Object.keys(guide).length) {
      if (guide.isPublished) {
        setIsPublished(true)
      }
    }
  }
  // getters, checkers, and setters end here

  //useEffects start here
  useEffect(() => {
    publishChecker()
    if (Object.keys(guide).length === 0) {
      getGuide()
    }
  }, [])

  useEffect(() => {
    if (Object.keys(guide).length) {
      getProfile()
      setFavorites(guide.favorites)
      setIsPublished(guide.isPublished)
    }
  }, [guide])

  useEffect(() => {
    // console.log(profile)
    if (Object.keys(profile).length) {
      favChecker()
      ownerChecker()
    }
  }, [profile])

  useEffect(() => {}, [file])

  // useEffect(() => {
  //   if (Object.keys(profile).length) {
  //     if (profile.favorites.includes(guideId)) {
  //     }
  //     if (!profile.favorites.includes(guideId)) {
  //     }
  //   }
  // }, [isFavorite])

  //use effects end here

  // styles start here
  const singleGuideTopCard = {
    background: '#2f2f2f',
    p: 1,
    pl: 2,
    mt: 1,
    border: 1.25,
    borderColor: '#353540',
  }
  const singleGuideTagCards = {
    background: '#2f2f2f',
    p: 1,
    pl: 2,
    pr: 2,
    mr: 1,
    mt: 1,
    width: '25%',
    minHeight: '10vh',
    textOverflow: 'ellipsis',
    border: 1.25,
    borderColor: '#353540',
  }
  const singleGuideApiCard = {
    background: '#2f2f2f',
    p: 1,
    pl: 2,
    pr: 2,
    mt: 1,
    width: '25%',
    minHeight: '10vh',
    textOverflow: 'ellipsis',
    border: 1.25,
    borderColor: '#353540',
  }
  const singleGuideTagCardTypography = {
    color: 'white',
    fontSize: '0.7em',
    minHeight: 18,
    p: 0.5,
    mt: 0.5,
    mb: 0.5,
    border: 1,
    borderColor: 'white',
    borderRadius: 3,
    textAlign: 'center',
    textOverflow: 'ellipsis',
  }
  const singleGuideApiCardTypography = {
    color: 'white',
    fontSize: '0.7em',
    minHeight: 18,
    p: 0.5,
    mt: 0.5,
    mb: 0.5,
    border: 1,
    borderColor: 'white',
    borderRadius: 3,
    textAlign: 'center',
    textOverflow: 'ellipsis',
  }
  const singleGuideAltCardTypography = {
    color: 'white',
    fontSize: '0.7em',
    minHeight: 18,
    p: 0.5,
    mt: 0.5,
    mb: 0.5,
    border: 1,
    borderColor: 'white',
    borderRadius: 3,
    textAlign: 'center',
  }
  const singleGuideTagTypography = {
    color: 'white',
    fontSize: '0.7em',
    minHeight: 18,
    p: 0.5,
    mt: 0.5,
    mb: 0.5,
    mr: 0.5,
    ml: 0.5,
    border: 1,
    borderColor: 'white',
    borderRadius: 3,
    textAlign: 'center',
  }
  const singleGuideReferenceCard = {
    background: '#2f2f2f',
    p: 1,
    pl: 2,
    mt: 1,
    overflow: 'auto',
    height: '450px',
    border: 1.25,
    borderColor: '#353540',
    color: 'white',
  }

  // styles end here

  return Object.keys(guide).length ? (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      {/* {console.log(guide)} */}
      {/* {console.log(guide.body)} */}
      {/* {console.log(profile)} */}
      {/* {console.log(isFavorite)} */}
      {/* {console.log(isOwner)} */}
      {/*
         Title
      */}
      <Typography variant="h3" sx={{ color: 'white', ml: 1 }}>
        {title.toUpperCase()}
      </Typography>
      {/* Title */}
      {!showBody ? (
        <>
          {/* start headcomponent */}
          {/* top card */}
          <Card elevation={12} sx={singleGuideTopCard}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '40px' }}>
              {/* timestamp and username logic */}
              <Typography sx={{ color: 'white', fontSize: '0.75em' }}>
                {`${username} — ${createdAt.toDate().toString().slice(0, 25)}`}
              </Typography>

              {/* edit & favorite icons */}

              <Box>
                {/* IsOwner */}
                <IconButton onClick={(e) => editGuide(e)}>
                  {isOwner ? <ModeEditSharpIcon sx={{ color: 'white' }} /> : null}
                </IconButton>
                {/* isFavorite */}
                <IconButton
                  onClick={() => {
                    if (!isFavorite) {
                      setProfile({ ...profile, favorites: [...profile.favorites, guideId] })
                      setProfileFavorite()
                    } else if (isFavorite) {
                      setProfile({
                        ...profile,
                        favorites: profile.favorites.filter((fav) => fav !== guideId),
                      })
                      removeProfileFavorite()
                    }
                    setIsFavorite(!isFavorite)
                  }}>
                  {isFavorite ? (
                    <BookmarkRoundedIcon sx={{ color: 'red' }} />
                  ) : (
                    <BookmarkBorderRoundedIcon sx={{ color: 'white' }} />
                  )}
                  <Typography sx={{ mx: 2, color: '#f57c00' }}>{favorites}</Typography>
                </IconButton>
              </Box>
            </Box>
            {/* description */}
            <Typography sx={{ color: 'white', mr: 2 }}>{description}</Typography>
          </Card>

          {/* technologies used begin here */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            {/*
          start the tech cards here
      */}

            <Card elevation={12} sx={singleGuideTagCards}>
              <Typography sx={{ color: 'white' }} gutterBottom>
                Languages
              </Typography>
              {languages.length ? (
                languages.map((item, idx) => {
                  return (
                    <Typography key={idx} sx={singleGuideTagCardTypography}>
                      {`${item}`}
                    </Typography>
                  )
                })
              ) : (
                <Typography sx={singleGuideAltCardTypography}>no languages yet!</Typography>
              )}
            </Card>

            <Card elevation={12} sx={singleGuideTagCards}>
              <Typography sx={{ color: 'white' }} gutterBottom>
                Front End
              </Typography>
              {frontEnd.length ? (
                frontEnd.map((item, idx) => {
                  return (
                    <Typography key={idx} sx={singleGuideTagCardTypography}>
                      {`${item}`}
                    </Typography>
                  )
                })
              ) : (
                <Typography sx={singleGuideAltCardTypography}>no front end yet!</Typography>
              )}
            </Card>

            <Card elevation={12} sx={singleGuideTagCards}>
              <Typography sx={{ color: 'white' }} gutterBottom>
                Back End
              </Typography>
              {backEnd.length ? (
                backEnd.map((item, idx) => {
                  return (
                    <Typography key={idx} sx={singleGuideTagCardTypography}>
                      {`${item}`}
                    </Typography>
                  )
                })
              ) : (
                <Typography sx={singleGuideAltCardTypography}>no back end yet!</Typography>
              )}
            </Card>

            <Card elevation={12} sx={singleGuideApiCard}>
              <Typography sx={{ color: 'white' }} gutterBottom>
                APIs
              </Typography>
              {API ? (
                API.map((item, idx) => {
                  return (
                    <Typography key={idx} sx={singleGuideApiCardTypography}>
                      {`${item}`}
                    </Typography>
                  )
                })
              ) : (
                <Typography sx={singleGuideAltCardTypography}>no APIs yet!</Typography>
              )}
            </Card>
          </Box>

          <Card
            elevation={12}
            sx={{
              background: '#2f2f2f',
              border: 1.25,
              borderColor: '#353540',
              mt: 1,
            }}>
            <Typography sx={{ color: 'white', mb: 1, ml: 1 }}>
              {/* start the tags here */}
              Tags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
              {tags.length
                ? tags.map((item, idx) => {
                    return item ? (
                      <Typography key={idx} sx={singleGuideTagTypography}>
                        {`${item}`}
                      </Typography>
                    ) : (
                      <Typography key={idx} sx={singleGuideTagTypography}>
                        no tags yet!
                      </Typography>
                    )
                  })
                : null}
            </Box>
          </Card>
          {/* end head component */}
        </>
      ) : (
        <>
          {/* start body component */}
          {guide.body.length ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '49%', mx: 0.5 }}>
                <Typography sx={{ color: 'white', ml: 1, mt: 1 }}>CodeBlock</Typography>
                <Card sx={singleGuideReferenceCard}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'white', fontSize: '0.75em' }}>
                      {guide.body[file].filepath}
                    </Typography>

                    <Box sx={{ ml: 2 }}>
                      <Typography sx={{ color: 'white', fontSize: '0.75em' }}>
                        {guide.body[file].language}
                      </Typography>
                      <FormControl
                        fullWidth
                        size="small"
                        sx={{
                          py: 0.5,
                          mt: 0.5,
                          width: '20ch',
                          color: 'white',
                          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#f57c00',
                          },
                          '& label.Mui-focused': {
                            color: '#f57c00',
                          },
                          '& label': {
                            color: 'white',
                          },
                          '&:hover label': {
                            color: '#f57c00',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                            py: 0.5,
                          },
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: '#f57c00',
                            },
                            '&:focus fieldset': {
                              borderColor: '#f57c00',
                            },
                            '& fieldset': {
                              borderColor: 'white',
                            },
                            '&:focus .MuiInputLabel-root': {
                              borderColor: '#f57c00',
                            },
                          },
                        }}>
                        <InputLabel>File</InputLabel>
                        <Select
                          value={file}
                          label={'File'}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                bgcolor: '#303035',
                                color: 'white',
                              },
                            },
                          }}
                          onChange={(e) => setFile(e.target.value)}>
                          {guide.body.length
                            ? guide.body.map((file, idx) => {
                                return (
                                  <MenuItem
                                    key={idx}
                                    value={idx}
                                    disableGutters={true}
                                    dense={true}
                                    sx={{
                                      py: 0,
                                      pl: 1,
                                      backgroundColor: '#cccccc55',
                                      fontSize: '1em',
                                      color: 'white',
                                    }}>
                                    {file.filepath}
                                  </MenuItem>
                                )
                              })
                            : null}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <CodeMirror
                    language={guide.body[file].language}
                    value={guide.body[file].codeBlock}
                  />
                </Card>
              </Box>
              <Box sx={{ width: '51%', mx: 0.5 }}>
                <Typography sx={{ color: 'white', ml: 1, mt: 1 }}>Reference</Typography>
                <Card sx={singleGuideReferenceCard}>
                  <ReactMarkdown children={guide.body[file].content} remarkPlugins={[remarkGfm]} />
                </Card>
              </Box>
            </Box>
          ) : (
            <Typography sx={{ color: 'white' }}>"loading..."</Typography>
          )}

          {/* end body component */}
        </>
      )}
      {/*
      button for published and body/head transition starts here
      */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          minHeight: 40,
        }}>
        {isPublished ? null : (
          <CheckCircleOutlineIcon
            onClick={() => {
              setIsPublished(true)
              setGuidePublished()
            }}
            sx={{
              alignSelf: 'flex-end',
              mr: 1.25,
              fontSize: 40,
              color: 'white',
              '&:hover': {
                cursor: 'pointer',
                color: 'green',
              },
            }}
          />
        )}
        <Button
          variant="contained"
          elevation={12}
          sx={{
            background: '#353540',
            color: '#f57c00',
            '&:hover': { background: '#505060' },
            border: 1,
            borderColor: '#2f2f2f',
            mt: 2,
          }}
          onClick={() => {
            setShowBody(!showBody)
          }}>
          <CodeIcon />
        </Button>
      </Box>
    </Container>
  ) : (
    <Typography sx={{ color: 'white' }}>"loading..."</Typography>
  )
}
