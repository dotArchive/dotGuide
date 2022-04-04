//react imports

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//firestore imports
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

//MUI imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Popover from '@mui/material/Popover'
import Link from '@mui/material/Link'

//mui icons
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded'
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp'
import CodeIcon from '@mui/icons-material/Code'
import SendIcon from '@mui/icons-material/Send'
import LinkIcon from '@mui/icons-material/Link'

//other imports
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeMirror from './CodeMirror'

export default function SingleGuide() {
  const navigate = useNavigate()

  // guide and profile data
  const [guide, setGuide] = useState({})
  const [profile, setProfile] = useState({})
  const [favorites, setFavorites] = useState(0)

  // toggles for events
  const [isFavorite, setIsFavorite] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [showBody, setShowBody] = useState(false)
  const [file, setFile] = useState(0)

  //other constants
  const { guideId } = useParams()
  const { createdAt, username } = guide

  //useEffects start here
  useEffect(() => {
    const publishChecker = () => {
      if (Object.keys(guide).length) {
        if (guide.isPublished) {
          setIsPublished(true)
        }
      }
    }
    publishChecker()
  }, [])

  useEffect(() => {
    const getGuide = async () => {
      const docRef = doc(db, 'guides', guideId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setGuide(docSnap.data())
      } else {
        console.log(`unable to get guide!`)
      }
    }
    if (Object.keys(guide).length === 0) {
      getGuide()
    }
  }, [guideId])

  useEffect(() => {
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
    if (Object.keys(guide).length) {
      getProfile()
      setFavorites(guide.favorites)
      setIsPublished(guide.isPublished)
    }
  }, [guide])

  useEffect(() => {
    // console.log(profile)
    if (Object.keys(profile).length) {
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
      favChecker()
      ownerChecker()
    }
  }, [profile])

  // getters, checkers, and setters and events

  const editGuide = (e) => {
    e.preventDefault()
    navigate(`/guide/edit/${guideId}`)
  }

  const setGuidePublished = async () => {
    const guideRef = doc(db, 'guides', guideId)
    setDoc(guideRef, { isPublished: true }, { merge: true })
  }

  const setProfileFavorite = async () => {
    const qS = await getDocs(
      query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid))
    )
    const profileId = qS.docs[0].id
    await updateDoc(doc(db, 'profiles', profileId), { favorites: arrayUnion(guideId) })
    await updateDoc(doc(db, 'guides', guideId), { favorites: increment(1) })
    setFavorites(favorites + 1)
  }

  const removeProfileFavorite = async () => {
    const qS = await getDocs(
      query(collection(db, 'profiles'), where('userId', '==', auth.currentUser.uid))
    )
    const profileId = qS.docs[0].id
    await updateDoc(doc(db, 'profiles', profileId), { favorites: arrayRemove(guideId) })
    await updateDoc(doc(db, 'guides', guideId), { favorites: increment(-1) })
    setFavorites(favorites - 1)
  }

  /*** styles  start ***/
  const outerContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  }
  const singleGuideTopCard = {
    background: '#2f2f2f',
    p: 1,
    pl: 2,
    mt: 1,
    border: 1.25,
    borderColor: '#353540',
  }
  const singleGuideTopBox = {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '40px',
  }
  const typographyTimestampUsername = {
    color: 'white',
    fontSize: '0.75em',
  }
  const singleGuideTechBox = {
    display: 'flex',
    justifyContent: 'space-between',
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
  const singleGuideOuterReferenceBox = {
    display: 'flex',
    flexDirection: 'column',
    width: '49%',
    mx: 0.5,
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
  const singleGuideReferenceBox = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
  const formControlSX = {
    py: 0.5,
    mt: 0.5,
    color: 'white',
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderRadius: 3,
    },
    '& label.Mui-focused': {},
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
        borderRadius: 3,
      },
      '&:focus fieldset': {
        borderRadius: 3,
      },
      '& fieldset': {
        borderColor: 'white',
        borderRadius: 3,
      },
      '&:focus .MuiInputLabel-root': {
        borderColor: '#f57c00',
        borderRadius: 3,
      },
    },
  }
  const menuItemSX = {
    py: 0,
    pl: 1,
    backgroundColor: '#cccccc55',
    fontSize: '1em',
    color: 'white',
  }
  const sendIcon = {
    color: '#468ef3',
    fontSize: 30,
  }
  const showBodyButton = {
    background: '#353540',
    color: '#468ef3',
    '&:hover': { background: '#505060' },
    border: 1,
    borderColor: '#2f2f2f',
    mt: 2,
  }
  const publishBox = {
    display: 'flex',
    justifyContent: 'flex-end',
    minHeight: 40,
  }
  const typographyOnlyWhite = {
    color: 'white',
  }
  const typographyWhiteMargin = {
    color: 'white',
    ml: 1,
    mt: 1,
  }
  const typographyWhiteFontSize = {
    color: 'white',
    fontSize: '0.75em',
  }
  const filePreviewCard = {
    background: '#2f2f2f',
    mt: 1,
    pb: 1,
    pt: 1,
    pl: 1,
    pr: 1,
    border: 1.25,
    borderColor: '#353540',
  }
  const formMenuProps = {
    PaperProps: {
      sx: {
        bgcolor: '#303035',
        color: 'white',
      },
    },
  }
  const tagUrlBox = {
    display: 'flex',
    my: 1,
    justifyContent: 'space-between',
  }
  const tagsUrlsLeft = {
    background: '#2f2f2f',
    border: 1.25,
    borderColor: '#353540',
    p: 1,
    pl: 2,
    pr: 2,
    mr: 0.5,
    width: '100%',
  }

  const tagsUrlsRight = {
    background: '#2f2f2f',
    border: 1.25,
    borderColor: '#353540',
    p: 1,
    pl: 2,
    pr: 2,
    ml: 0.5,
    width: '100%',
  }
  const urlPopover = {
    p: 1,
    background: '#2f2f2f',
    border: 1.25,
    borderColor: '#353540',
    color: 'white',
  }
  const popoverAnchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
  }
  const popoverTransformOrigin = {
    vertical: 'top',
    horizontal: 'center',
  }
  const loadingPageStyles = {
    color: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    mt: '25%',
    mb: '50%',
  }

  // styles end here

  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

  const handlePopoverOpen = (event, idx) => {
    setAnchorEl(event.target)
    setOpen(idx)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
    setOpen(null)
  }

  return Object.keys(guide).length ? (
    <Container sx={outerContainer}>
      {/* Title */}
      <Typography variant="h3" sx={typographyWhiteMargin}>
        {guide.head.title.toUpperCase()}
      </Typography>
      {/* Title */}
      {/* top card */}
      <Card elevation={12} sx={singleGuideTopCard}>
        <Box sx={singleGuideTopBox}>
          {/* timestamp and username logic */}
          <Typography sx={typographyTimestampUsername}>
            {`${username} — ${createdAt.toDate().toString().slice(0, 25)}`}
          </Typography>

          {/* edit & favorite icons */}

          <Box>
            {/* IsOwner */}
            {isOwner ? (
              <IconButton onClick={(e) => editGuide(e)}>
                <ModeEditSharpIcon sx={typographyOnlyWhite} />
              </IconButton>
            ) : null}
            {/* isFavorite */}
            <IconButton
              onClick={() => {
                if (!isFavorite) {
                  setProfile({
                    ...profile,
                    favorites: [...profile.favorites, guideId],
                  })
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
                <BookmarkBorderRoundedIcon sx={typographyOnlyWhite} />
              )}
              <Typography sx={{ mx: 2, color: '#468ef3' }}>{favorites}</Typography>
            </IconButton>
          </Box>
        </Box>
        {/* description */}
        <Typography sx={{ color: 'white', mr: 2 }}>{guide.head.description}</Typography>
      </Card>
      {!showBody ? (
        <>
          {/* start headcomponent */}

          {/* technologies used begin here */}
          <Box sx={singleGuideTechBox}>
            {/*
          start the tech cards here
      */}

            <Card elevation={12} sx={singleGuideTagCards}>
              <Typography sx={typographyOnlyWhite} gutterBottom>
                Languages
              </Typography>
              {guide.head.language
                ? guide.head.language.map((item, idx) =>
                    item.language ? (
                      <Typography key={idx} sx={singleGuideTagCardTypography}>
                        {`${item.language}`}
                      </Typography>
                    ) : null
                  )
                : null}
            </Card>

            <Card elevation={12} sx={singleGuideTagCards}>
              <Typography sx={typographyOnlyWhite} gutterBottom>
                Front End
              </Typography>
              {guide.head.frontEnd
                ? guide.head.frontEnd.map((item, idx) =>
                    item.frontEnd ? (
                      <Typography key={idx} sx={singleGuideTagCardTypography}>
                        {`${item.frontEnd}`}
                      </Typography>
                    ) : null
                  )
                : null}
            </Card>

            <Card elevation={12} sx={singleGuideTagCards}>
              <Typography sx={typographyOnlyWhite} gutterBottom>
                Back End
              </Typography>
              {guide.head.backEnd
                ? guide.head.backEnd.map((item, idx) =>
                    item.backEnd ? (
                      <Typography key={idx} sx={singleGuideTagCardTypography}>
                        {`${item.backEnd}`}
                      </Typography>
                    ) : null
                  )
                : null}
            </Card>

            <Card elevation={12} sx={singleGuideApiCard}>
              <Typography sx={typographyOnlyWhite} gutterBottom>
                APIs
              </Typography>
              {guide.head.API
                ? guide.head.API.map((item, idx) =>
                    item.API ? (
                      <Typography key={idx} sx={singleGuideApiCardTypography}>
                        {`${item.API}`}
                      </Typography>
                    ) : null
                  )
                : null}
            </Card>
          </Box>

          <Box sx={tagUrlBox}>
            <Card elevation={12} sx={tagsUrlsLeft}>
              <Typography sx={{ color: 'white', mb: 1, ml: 1 }}>
                {/* start the tags here */}
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
                {guide.head.tag
                  ? guide.head.tag.map((item, idx) =>
                      item.tag ? (
                        <Typography key={idx} sx={singleGuideTagTypography}>
                          {`${item.tag}`}
                        </Typography>
                      ) : null
                    )
                  : null}
              </Box>
            </Card>
            <Card elevation={12} sx={tagsUrlsRight}>
              <Typography sx={{ color: 'white', mb: 1, ml: 1 }}>Links</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
                {guide.head.url.length
                  ? guide.head.url.map((item, idx) =>
                      item.URL ? (
                        <div key={idx}>
                          <Link href={item.URL} target="_blank" underline="none">
                            <IconButton
                              sx={singleGuideTagTypography}
                              onMouseEnter={(e) => handlePopoverOpen(e, idx)}
                              onMouseLeave={handlePopoverClose}
                              size="small">
                              <LinkIcon />
                            </IconButton>
                          </Link>
                          <Popover
                            sx={{ pointerEvents: 'none' }}
                            open={open === idx}
                            anchorEl={anchorEl}
                            anchorOrigin={popoverAnchorOrigin}
                            transformOrigin={popoverTransformOrigin}
                            onClose={handlePopoverClose}
                            disableRestoreFocus>
                            <Typography sx={urlPopover}>{item.URL}</Typography>
                          </Popover>
                        </div>
                      ) : null
                    )
                  : null}
              </Box>
            </Card>
          </Box>

          {/* end head component */}
        </>
      ) : (
        <>
          {/* start body component */}
          {guide.body.length ? (
            <div>
              <Card sx={filePreviewCard}>
                <FormControl fullWidth label="Language" size="small" sx={formControlSX}>
                  <InputLabel>File Path</InputLabel>
                  <Select
                    MenuProps={formMenuProps}
                    size="small"
                    label={'File Path'}
                    id="language"
                    onChange={(e) => setFile(e.target.value)}
                    value={file}>
                    {guide.body.map((file, idx) => (
                      <MenuItem
                        key={idx}
                        disableGutters={true}
                        dense={true}
                        sx={menuItemSX}
                        value={idx}>
                        {file.filepath}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Card>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={singleGuideOuterReferenceBox}>
                  <Card sx={singleGuideReferenceCard}>
                    <Box sx={singleGuideReferenceBox}>
                      <Typography sx={typographyWhiteFontSize}>
                        {guide.body[file].filepath}
                      </Typography>

                      <Box sx={{ ml: 2 }}>
                        <Typography sx={typographyWhiteFontSize}>
                          {guide.body[file].language.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>
                    <CodeMirror
                      language={guide.body[file].language}
                      value={guide.body[file].codeBlock}
                    />
                  </Card>
                </Box>
                <Box sx={{ width: '51%', mx: 0.5 }}>
                  <Card sx={singleGuideReferenceCard}>
                    <ReactMarkdown
                      children={guide.body[file].content}
                      remarkPlugins={[remarkGfm]}
                    />
                  </Card>
                </Box>
              </Box>
            </div>
          ) : (
            <Typography sx={typographyOnlyWhite}>"loading..."</Typography>
          )}

          {/* end body component */}
        </>
      )}
      {/* button for published and body/head transition starts here */}
      <Box sx={publishBox}>
        {isPublished ? null : (
          <Button sx={{ mt: 2 }}>
            <SendIcon
              sx={sendIcon}
              onClick={() => {
                setIsPublished(true)
                setGuidePublished()
              }}
            />
          </Button>
        )}
        <Button
          variant="contained"
          elevation={12}
          sx={showBodyButton}
          onClick={() => setShowBody(!showBody)}>
          <CodeIcon />
        </Button>
      </Box>
    </Container>
  ) : (
    <Typography sx={loadingPageStyles}>"loading guide..."</Typography>
  )
}
