import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Typography, Box, Button, Card, Container } from '@mui/material'

export default function SingleGuide() {
  let { guideId } = useParams()
  const [guide, setGuide] = useState({})
  // const [time, setTime] = useState('')
  const { frontEnd, backEnd, tags, apis, languages, username } = guide

  const getGuide = async () => {
    const docSnap = await getDoc(doc(db, 'guides', guideId))
    if (docSnap.exists()) {
      setGuide(docSnap.data())
    } else {
      console.log(`doesn't work foo!`)
    }
  }
  useEffect(() => {
    return getGuide()
  }, [])

  return guide.createdAt ? (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      {console.log(guide)}
      <Typography variant="h3" sx={{ color: 'white' }}>
        {guide.title}
      </Typography>
      <Card sx={{ background: '#2f2f2f', p: 1, pl: 2, pr: 2 }}>
        <Typography sx={{ color: 'white', fontSize: '0.75em' }}>
          {`${username} — ${guide.createdAt.toDate().toString().slice(0, 25)}`}
        </Typography>
        <Typography sx={{ color: 'white' }}>{guide.description}</Typography>
      </Card>
      <Typography sx={{ color: 'white' }}>Technologies Used</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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
          }}>
          <Typography sx={{ color: 'white' }} gutterBottom>
            Languages
          </Typography>
          {languages ? (
            languages.map((item, idx) => {
              return (
                <Typography
                  key={idx}
                  sx={{
                    color: 'white',
                    fontSize: '0.7em',
                    p: 0.5,
                    mt: 0.5,
                    mb: 0.5,
                    border: 1,
                    borderColor: 'white',
                    borderRadius: 3,
                  }}>
                  {`${item.frontEnd}`}
                </Typography>
              )
            })
          ) : (
            <Typography
              sx={{
                color: 'white',
                fontSize: '0.7em',
                p: 0.5,
                mt: 0.5,
                mb: 0.5,
                border: 1,
                borderColor: 'white',
                borderRadius: 3,
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
          }}>
          <Typography sx={{ color: 'white' }} gutterBottom>
            Front End
          </Typography>
          {frontEnd.map((item, idx) => {
            return (
              <Typography
                key={idx}
                sx={{
                  color: 'white',
                  fontSize: '0.7em',
                  p: 0.5,
                  mt: 0.5,
                  mb: 0.5,
                  border: 1,
                  borderColor: 'white',
                  borderRadius: 3,
                }}>
                {`${item.frontEnd}`}
              </Typography>
            )
          })}
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
          }}>
          <Typography sx={{ color: 'white' }} gutterBottom>
            Back End
          </Typography>
          {backEnd.map((item, idx) => {
            return (
              <Typography
                key={idx}
                sx={{
                  color: 'white',
                  fontSize: '0.7em',
                  p: 0.5,
                  mt: 0.5,
                  mb: 0.5,
                  border: 1,
                  borderColor: 'white',
                  borderRadius: 3,
                }}>
                {`${item.backEnd}`}
              </Typography>
            )
          })}
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
          }}>
          <Typography sx={{ color: 'white' }} gutterBottom>
            APIs
          </Typography>
          {apis.map((item, idx) => {
            return (
              <Typography
                key={idx}
                sx={{
                  color: 'white',
                  fontSize: '0.7em',
                  p: 0.5,
                  mt: 0.5,
                  mb: 0.5,
                  border: 1,
                  borderColor: 'white',
                  borderRadius: 3,
                }}>
                {`${item.API}`}
              </Typography>
            )
          })}
        </Card>
      </Box>
      <Card
        sx={{
          background: '#2f2f2f',
          mt: 2,
        }}>
        <Typography sx={{ color: 'white' }} gutterBottom>
          Other Tags
        </Typography>
        <Box sx={{ display: 'flex', mb: 1 }}>
          {tags.map((item, idx) => {
            return (
              <Typography
                key={idx}
                sx={{
                  color: 'white',
                  fontSize: '0.7em',
                  border: 1,
                  borderColor: 'white',
                  borderRadius: 3,
                  p: 0.5,
                  ml: 1,
                  mr: 1,
                }}>
                {`${item.tag}`}
              </Typography>
            )
          })}
        </Box>
      </Card>
    </Container>
  ) : (
    <Typography sx={{ color: 'white' }}>"loading..."</Typography>
  )
}
