// React Imports
import React, { useEffect, useState } from 'react'

// Firebase imports
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../firebase'

//MUI
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

// Components
import BackEnd from './TechStack/BackEnd'
import FrontEnd from './TechStack/FrontEnd'
import Api from './TechStack/API'
import Language from './TechStack/Language'
import Title from './Title'
import Tag from './Tag'
import GuideDescription from './GuideDescription'
import CodeURL from './CodeURL'

export default function Head(props) {
  //document title and description
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // head top cards
  const [languages, setLanguages] = useState([])
  const [frontEnds, setFrontEnd] = useState([])
  const [backEnds, setBackEnd] = useState([])
  const [apis, setApi] = useState([])
  // head bottom cards
  const [tags, setTags] = useState([])
  const [urls, setUrl] = useState([])

  useEffect(() => {
    if (props.save === true) updateHead()
    if (props.submit === true) updateHead()
  })

  let search = []
  const guideId = props.guideId

  //Head top cards
  const language = languages.map((language) => {
    if (language.language.length) {
      search.push(language.language.toLowerCase())
    }
    return language
  })
  const API = apis.map((API) => {
    if (API.API.length) {
      search.push(API.API.toLowerCase())
    }
    return API
  })
  const frontEnd = frontEnds.map((frontEnd) => {
    if (frontEnd.frontEnd.length) {
      search.push(frontEnd.frontEnd.toLowerCase())
    }
    return frontEnd
  })
  const backEnd = backEnds.map((backEnd) => {
    if (backEnd.backEnd.length) {
      search.push(backEnd.backEnd.toLowerCase())
    }

    return backEnd
  })

  //head bottom cards
  const tag = tags.map((tag) => {
    if (tag.tag.length) {
      search.push(tag.tag.toLowerCase())
    }
    return tag
  })
  const url = urls.map((url) => url)

  //update the edited doc when ready
  const updateHead = async () => {
    //filter given tags and attributes, if empty, remove it
    const LANG = language.filter((el) => el.language !== '')
    const TAG = tag.filter((el) => el.tag !== '')
    const api = API.filter((el) => el.API !== '')
    const FEND = frontEnd.filter((el) => el.frontEnd !== '')
    const BEND = backEnd.filter((el) => el.backEnd !== '')
    const urls = url.filter((el) => el.URL !== '')

    // set head that will be added to update
    let head = {
      title,
      description,
    }

    // if there's something left after filter, add it to head
    if (LANG.length) head.language = LANG
    if (TAG.length) head.tag = TAG
    if (api.length) head.API = api
    if (FEND.length) head.frontEnd = FEND
    if (BEND.length) head.backEnd = BEND
    if (url.length) head.URL = urls

    // add existing tags to search list
    search.push(title.toLowerCase())
    const guideRef = doc(db, 'guides', guideId)

    // update head, search, and timestamp
    await updateDoc(guideRef, {
      head,
      search,
    })
  }

  //mui styles constants
  const outerContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    color: 'white',
  }
  const topCard = {
    background: '#2f2f2f',
    p: 1,
    pl: 2,
    pr: 2,
    border: 1.25,
    borderColor: '#353540',
    mb: '0.5rem',
  }
  const usernameTypography = {
    color: 'white',
    fontSize: '0.75em',
    height: 40,
  }
  const techBox = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  }
  const techOuterCard = {
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
  }
  const techCards = {
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
  }
  const tagUrlBox = {
    display: 'flex',
    mb: 1,
    justifyContent: 'space-between',
    gap: '10px',
  }
  const tagsUrlsCards = {
    background: '#2f2f2f',
    border: 1.25,
    borderColor: '#353540',
    flexGrow: 1,
    p: 1,
    pl: 2,
    pr: 2,
    width: '50%',
  }

  return (
    <Container sx={outerContainer}>
      <Title guide={props.guide} titleChild={(data) => setTitle(data)} />
      <Card sx={topCard}>
        <div className="flexbox" style={{ justifyContent: 'space-between' }}>
          <Typography sx={usernameTypography}>{props.username}</Typography>
        </div>
        <GuideDescription guide={props.guide} descriptionChild={(data) => setDescription(data)} />
      </Card>
      <Typography sx={{ color: 'white', ml: 1 }}></Typography>

      <Box sx={techBox}>
        <Card sx={techOuterCard}>
          <Language guide={props.guide} languageChild={(data) => setLanguages(data)} />
        </Card>
        <Card sx={techCards}>
          <FrontEnd guide={props.guide} frontEndChild={(data) => setFrontEnd(data)} />
        </Card>
        <Card sx={techCards}>
          <BackEnd guide={props.guide} backEndChild={(data) => setBackEnd(data)} />
        </Card>
        <Card sx={techCards}>
          <Api guide={props.guide} apiChild={(data) => setApi(data)} />
        </Card>
      </Box>

      <Typography sx={{ color: 'white', mt: 1, ml: 1 }}></Typography>
      <Box sx={tagUrlBox}>
        <Card sx={tagsUrlsCards}>
          <Tag guide={props.guide} tagChild={(data) => setTags(data)} />
        </Card>
        <Card sx={tagsUrlsCards}>
          <CodeURL guide={props.guide} urlChild={(data) => setUrl(data)} />
        </Card>
      </Box>
    </Container>
  )
}
