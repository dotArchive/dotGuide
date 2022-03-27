import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDocs, getDoc, setDoc, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Typography, Box, IconButton, Button, Card, Container } from '@mui/material'
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded'
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp'
import CodeIcon from '@mui/icons-material/Code'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Controlled } from 'react-codemirror2-react-17'
import CodeMirror from './CodeMirror'

export default function SingleGuide() {
  //useStates
  const [guide, setGuide] = useState({})
  const [profile, setProfile] = useState({})
  const [isFavorite, setIsFavorite] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [showBody, setShowBody] = useState(false)

  //other constants
  const { guideId } = useParams()
  const {
    frontEnd,
    backEnd,
    tags,
    apis,
    languages,
    username,
    title,
    createdAt,
    description,
    body,
  } = guide
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
    // //option 1
    // await setDoc(doc(db, 'profiles', guideId), {...guide, isPublished: true})
    // option 2
    // const guideRef = doc(db, 'guides', guideId)
    // setDoc(guideRef, { isPublished: true }, { merge: true })
  }
  const favChecker = () => {
    if (Object.keys(profile).length) {
      profile.favorites.forEach((favorite) => {
        if (favorite === guideId) {
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
      const q = query(collection(db, 'profiles'), where('userId', '==', guide.userId))
      const qS = await getDocs(q)
      qS.forEach((doc) => {
        setProfile(doc.data())
      })
    } else {
      // console.log('try profile again')
    }
  }
  const editGuide = () => {
    //editGuide is event handler for sending you to the edit guide page for this guide
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
    }
  }, [guide])
  useEffect(() => {
    if (Object.keys(profile).length) {
      favChecker()
      ownerChecker()
    }
  }, [profile])

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
      {console.log(profile)}
      {/* {console.log(isFavorite)} */}
      {/* {console.log(isOwner)} */}
      {/*
         Title
      */}
      <Typography variant="h3" sx={{ color: 'white', ml: 1 }}>
        {title.toUpperCase()}
      </Typography>

      {!showBody ? (
        <>
          {/* start headcomponent */}
          {/* top card */}
          <Card elevation={12} sx={singleGuideTopCard}>
            <Box sx={{ display: 'flex', flowDirection: 'row', justifyContent: 'space-between' }}>
              {/* timestamp and username logic */}
              <Typography sx={{ color: 'white', fontSize: '0.75em', minHeight: 40 }}>
                {`${username} — ${createdAt.toDate().toString().slice(0, 25)}`}
              </Typography>

              {/* edit & favorite icons */}

              <Box>
                {/* IsOwner */}
                <IconButton onClick={() => editGuide()}>
                  {isOwner ? <ModeEditSharpIcon sx={{ color: 'white' }} /> : null}
                </IconButton>
                {/* isFavorite */}
                <IconButton onClick={() => setIsFavorite(!isFavorite)}>
                  {isFavorite ? (
                    <BookmarkRoundedIcon sx={{ color: 'red' }} />
                  ) : (
                    <BookmarkBorderRoundedIcon sx={{ color: 'white' }} />
                  )}
                </IconButton>
              </Box>
            </Box>
            {/* description */}
            <Typography sx={{ color: 'white', mr: 2 }}>{description}</Typography>
          </Card>

          {/* technologies used begin here */}
          <Typography sx={{ color: 'white', ml: 1, mt: 1 }}>Technologies Used</Typography>
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
                      {`${item.frontEnd}`}
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
                      {`${item.backEnd}`}
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
              {apis ? (
                apis.map((item, idx) => {
                  return (
                    <Typography key={idx} sx={singleGuideApiCardTypography}>
                      {`${item.API}`}
                    </Typography>
                  )
                })
              ) : (
                <Typography sx={singleGuideAltCardTypography}>no APIs yet!</Typography>
              )}
            </Card>
          </Box>

          <Typography sx={{ color: 'white', mt: 1, ml: 1 }}>
            {/* start the tags here */}
            Other Tags
          </Typography>

          <Card
            elevation={12}
            sx={{
              background: '#2f2f2f',
              border: 1.25,
              borderColor: '#353540',
            }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
              {tags.length ? (
                tags.map((item, idx) => {
                  return (
                    <Typography key={idx} sx={singleGuideTagTypography}>
                      {`${item.tag}`}
                    </Typography>
                  )
                })
              ) : (
                <Typography sx={singleGuideAltCardTypography}>no tags yet!</Typography>
              )}
            </Box>
          </Card>
          {/* end head component */}
        </>
      ) : (
        <>
          {/* start body component */}
          {guide.body.length ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '49%', mx: 0.5 }}>
                <Typography sx={{ color: 'white', ml: 1, mt: 1 }}>CodeBlock</Typography>
                <Card sx={singleGuideReferenceCard}>
                  <Typography sx={{ color: 'white', fontSize: '0.75em' }}>
                    {guide.body[0].filepath}
                  </Typography>
                  <CodeMirror language={guide.body[0].language} value={guide.body[0].codeBlock} />
                </Card>
              </Box>
              <Box sx={{ width: '51%', mx: 0.5 }}>
                <Typography sx={{ color: 'white', ml: 1, mt: 1 }}>Reference</Typography>
                <Card sx={singleGuideReferenceCard}>
                  <ReactMarkdown children={guide.body[0].content} remarkPlugins={[remarkGfm]} />
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
            color: 'Gold',
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
