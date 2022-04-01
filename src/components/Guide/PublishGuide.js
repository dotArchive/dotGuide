//react imports
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//firestore imports
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

//mui imports
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
export default function PublishGuide() {
  const [guide, setGuide] = useState({ head: '' })

  const navigate = useNavigate()
  const guideId = useParams().guideId

  useEffect(() => {
    const getGuide = async () => {
      const docRef = doc(db, 'guides', guideId)
      const docSnap = await getDoc(docRef)
      console.log(docSnap.data())
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

  const outerContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  }

  const typographyWhiteMargin = {
    color: 'white',
    ml: 1,
    mt: 1,
    justifyContent: 'center',
    textAlign: 'center',
  }

  const searchButtons = {
    ml: 3,
    mt: 3,
    py: 0.5,
    borderRadius: 10,
    color: '#468ef3',
    width: '130px',
    border: 2,
    borderColor: '#102040',
  }

  return (
    <Container sx={outerContainer}>
      <Typography variant="h3" sx={typographyWhiteMargin}>
        {guide.head.title ? guide.head.title : 'Your Guide'}
      </Typography>
      <Typography variant="h3" sx={typographyWhiteMargin}>
        has been successfully published!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button onClick={() => navigate(`/guide/${guideId}`)} sx={searchButtons}>
          VIEW GUIDE
        </Button>
        <Button onClick={() => navigate('/guide/add')} sx={searchButtons}>
          NEW GUIDE
        </Button>
        <Button onClick={() => navigate('/profile')} sx={searchButtons}>
          PROFILE
        </Button>
        <Button onClick={() => navigate('/')} sx={searchButtons}>
          HOME
        </Button>
      </Box>
      <p />
    </Container>
  )
}
