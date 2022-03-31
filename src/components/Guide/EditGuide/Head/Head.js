import React, { useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../firebase'

// Components
import BackEnd from './TechStack/BackEnd'
import FrontEnd from './TechStack/FrontEnd'
import Api from './TechStack/API'
import Language from './TechStack/Language'
import Title from './Title'
import Tag from './Tag'
import GuideDescription from './GuideDescription'
import CodeURL from './CodeURL'

//MUI
import { Typography, Box, IconButton, Card, Container } from '@mui/material'
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded'
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp'

export default function Head(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [urls, setUrl] = useState([])
  const [apis, setApi] = useState([])
  const [frontEnds, setFrontEnd] = useState([])
  const [backEnds, setBackEnd] = useState([])
  const [languages, setLanguages] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (props.save === true) updateHead()
  })

  useEffect(() => {
    if (props.submit === true) updateHead()
  })

  let search = []
  const guideId = props.guideId

  const language = languages.map((language) => {
    search.push(language.language)
    return language
  })
  const tag = tags.map((tag) => {
    search.push(tag.tag)
    return tag
  })
  const url = urls.map((url) => {
    return url
  })

  const API = apis.map((API) => {
    search.push(API.API)
    return API
  })

  const frontEnd = frontEnds.map((frontEnd) => {
    search.push(frontEnd.frontEnd)
    return frontEnd
  })
  const backEnd = backEnds.map((backEnd) => {
    search.push(backEnd.backEnd)
    return backEnd
  })

  const updateHead = async () => {
    search.push(title)
    const guideRef = doc(db, 'guides', guideId)
    await updateDoc(guideRef, {
      head: {
        title,
        description,
        API,
        frontEnd,
        backEnd,
        language,
        url,
        tag,
      },
      search,
    })
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        color: 'white',
      }}>
      <Title guide={props.guide} titleChild={(data) => setTitle(data)} />
      <Card
        sx={{
          background: '#2f2f2f',
          p: 1,
          pl: 2,
          pr: 2,
          border: 1.25,
          borderColor: '#353540',
          mb: '0.5rem',
        }}>
        <div className="flexbox" style={{ justifyContent: 'space-between' }}>
          <Typography sx={{ color: 'white', fontSize: '0.75em' }}>{`Username`}</Typography>
          <div>
            <IconButton>
              <ModeEditSharpIcon sx={{ color: 'white' }} />
            </IconButton>
            <IconButton>
              {isFavorite ? (
                <BookmarkRoundedIcon
                  sx={{ color: '#d32f2f' }}
                  onClick={() => setIsFavorite(!isFavorite)}
                />
              ) : (
                <BookmarkBorderRoundedIcon
                  sx={{ color: 'white' }}
                  onClick={() => setIsFavorite(!isFavorite)}
                />
              )}
            </IconButton>
          </div>
        </div>
        <GuideDescription guide={props.guide} descriptionChild={(data) => setDescription(data)} />
      </Card>
      <Typography sx={{ color: 'white', ml: 1 }}></Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        }}>
        <Card
          sx={{
            background: '#2f2f2f',
            p: 1,
            pl: 2,
            pr: 2,
            width: '25%',
            minHeight: '10vh',
            textOverflow: 'ellipsis',
            border: 1.25,
            borderColor: '#353540',
            flexGrow: 1,
          }}>
          <Language guide={props.guide} languageChild={(data) => setLanguages(data)} />
        </Card>
        <Card
          sx={{
            background: '#2f2f2f',
            p: 1,
            pl: 2,
            pr: 2,
            width: '25%',
            minHeight: '10vh',
            textOverflow: 'ellipsis',
            border: 1.25,
            borderColor: '#353540',
            flexGrow: 1,
          }}>
          <FrontEnd guide={props.guide} frontEndChild={(data) => setFrontEnd(data)} />
        </Card>
        <Card
          sx={{
            background: '#2f2f2f',
            p: 1,
            pl: 2,
            pr: 2,
            width: '25%',
            minHeight: '10vh',
            textOverflow: 'ellipsis',
            border: 1.25,
            borderColor: '#353540',
            flexGrow: 1,
          }}>
          <BackEnd guide={props.guide} backEndChild={(data) => setBackEnd(data)} />
        </Card>
        <Card
          sx={{
            background: '#2f2f2f',
            p: 1,
            pl: 2,
            pr: 2,
            width: '25%',
            minHeight: '10vh',
            textOverflow: 'ellipsis',
            border: 1.25,
            borderColor: '#353540',
            flexGrow: 1,
          }}>
          <Api guide={props.guide} apiChild={(data) => setApi(data)} />
        </Card>
      </Box>

      <Typography sx={{ color: 'white', mt: 1, ml: 1 }}></Typography>
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          justifyContent: 'space-between',
          gap: '10px',
        }}>
        <Card
          sx={{
            background: '#2f2f2f',
            border: 1.25,
            borderColor: '#353540',
            flexGrow: 1,
            p: 1,
            pl: 2,
            pr: 2,
            width: '50%',
          }}>
          <Tag guide={props.guide} tagChild={(data) => setTags(data)} />
        </Card>
        <Card
          sx={{
            background: '#2f2f2f',
            border: 1.25,
            borderColor: '#353540',
            flexGrow: 1,
            p: 1,
            pl: 2,
            pr: 2,
            width: '50%',
          }}>
          <CodeURL guide={props.guide} urlChild={(data) => setUrl(data)} />
        </Card>
      </Box>
    </Container>
  )
}
