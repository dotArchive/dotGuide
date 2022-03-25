import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Typography, Box, Button, Card, Container } from '@mui/material'

export default function SingleGuide() {
  let { guideId } = useParams()
  const [guide, setGuide] = useState({})
  const { frontEnd, backEnd, tags, apis, languages, username, title, createdAt, description } =
    guide

  const getGuide = async () => {
    const docSnap = await getDoc(doc(db, 'guides', guideId))
    if (docSnap.exists()) {
      setGuide(docSnap.data())
    } else {
      console.log(`unable to get guide!`)
    }
  }
  useEffect(() => {
    return getGuide()
  }, [])

  return Object.keys(guide).length ? (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      {console.log(guide)}
      {/*
         Title
      */}

      <Typography variant="h3" sx={{ color: 'white', ml: 1 }}>
        {title.toUpperCase()}

        {/*
          top card
      */}
      </Typography>
      <Card
        sx={{ background: '#2f2f2f', p: 1, pl: 2, pr: 2, border: 1.25, borderColor: '#353540' }}>
        {/*
          timestamp and username logic
      */}
        <Typography sx={{ color: 'white', fontSize: '0.75em' }}>
          {`${username} — ${createdAt.toDate().toString().slice(0, 25)}`}
        </Typography>
        {/*

      */}
        <Typography sx={{ color: 'white' }}>{description}</Typography>
      </Card>

      {/*
          technologies used begin here
      */}

      <Typography sx={{ color: 'white', ml: 1 }}>Technologies Used</Typography>
      <Box
        sx={{
          display: 'flex',
          // flexDirection: 'row',
          justifyContent: 'space-between',
          // alignContent: 'center',
        }}>
        {/*
          start the tech cards here
      */}

        <Card
          sx={{
            background: '#2f2f2f',
            p: 1,
            pl: 2,
            pr: 2,
            mr: 1,
            width: '25%',
            minHeight: '10vh',
            textOverflow: 'ellipsis',
            border: 1.25,
            borderColor: '#353540',
          }}>
          <Typography sx={{ color: 'white' }} gutterBottom>
            Languages
          </Typography>
          {languages.length ? (
            languages.map((item, idx) => {
              return (
                <Typography
                  key={idx}
                  sx={{
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
                  }}>
                  {`${item}`}
                </Typography>
              )
            })
          ) : (
            <Typography
              sx={{
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
              }}>
              no languages yet!
            </Typography>
          )}
        </Card>

        <Card
          sx={{
            background: '#2f2f2f',
            p: 1,
            pl: 2,
            pr: 2,
            ml: 1,
            mr: 1,
            width: '25%',
            minHeight: '10vh',
            textOverflow: 'ellipsis',
            border: 1.25,
            borderColor: '#353540',
          }}>
          <Typography sx={{ color: 'white' }} gutterBottom>
            Front End
          </Typography>
          {frontEnd.length ? (
            frontEnd.map((item, idx) => {
              return (
                <Typography
                  key={idx}
                  sx={{
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
                  }}>
                  {`${item}`}
                </Typography>
              )
            })
          ) : (
            <Typography
              sx={{
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
              }}>
              no front end yet!
            </Typography>
          )}
        </Card>

        <Card
          sx={{
            background: '#2f2f2f',
            p: 1,
            pl: 2,
            pr: 2,
            ml: 1,
            mr: 1,
            width: '25%',
            minHeight: '10vh',
            textOverflow: 'ellipsis',
            border: 1.25,
            borderColor: '#353540',
          }}>
          <Typography sx={{ color: 'white' }} gutterBottom>
            Back End
          </Typography>
          {backEnd.length ? (
            backEnd.map((item, idx) => {
              return (
                <Typography
                  key={idx}
                  sx={{
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
                  }}>
                  {`${item.backEnd}`}
                </Typography>
              )
            })
          ) : (
            <Typography
              sx={{
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
              }}>
              no back end yet!
            </Typography>
          )}
        </Card>

        <Card
          sx={{
            background: '#2f2f2f',
            p: 1,
            pl: 2,
            pr: 2,
            ml: 1,
            mr: 1,
            width: '25%',
            minHeight: '10vh',
            textOverflow: 'ellipsis',
            border: 1.25,
            borderColor: '#353540',
          }}>
          <Typography sx={{ color: 'white' }} gutterBottom>
            APIs
          </Typography>
          {apis ? (
            apis.map((item, idx) => {
              return (
                <Typography
                  key={idx}
                  sx={{
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
                  }}>
                  {`${item.API}`}
                </Typography>
              )
            })
          ) : (
            <Typography
              sx={{
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
              }}>
              no APIs yet!
            </Typography>
          )}
        </Card>
      </Box>

      {/*
          start the tags here
      */}

      <Typography sx={{ color: 'white', mt: 1, ml: 1 }}>Other Tags</Typography>
      <Card
        sx={{
          background: '#2f2f2f',
          // mt: 0,
          border: 1.25,
          borderColor: '#353540',
        }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
          {tags.length ? (
            tags.map((item, idx) => {
              return (
                <Typography
                  key={idx}
                  sx={{
                    color: 'white',
                    fontSize: '0.7em',
                    minHeight: 18,
                    border: 1,
                    borderColor: 'white',
                    borderRadius: 3,
                    minWidth: 20,
                    p: 0.5,
                    mt: 0.5,
                    mb: 0.5,
                    ml: 1,
                    mr: 1,
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                  {`${item.tag}`}
                </Typography>
              )
            })
          ) : (
            <Typography
              sx={{
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
              }}>
              no tags yet!
            </Typography>
          )}
        </Box>
      </Card>
    </Container>
  ) : (
    <Typography sx={{ color: 'white' }}>"loading..."</Typography>
  )
}
