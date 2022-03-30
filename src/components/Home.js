import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, doc, getDocs, query, orderBy, where, limit } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import GuidePreview from './GuidePreview'

export const Home = () => {
  const navigate = useNavigate()

  const [popularTags, setPopularTags] = useState([
    'JavaScript',
    'React',
    'Express',
    'Vue.js',
    'Firebase',
  ])
  const [latestGuides, setLatestGuides] = useState([])
  const [latestGuideIds, setLatestGuideIds] = useState([])

  useEffect(() => {
    getLatestFiveGuides()
  }, [])

  const getLatestFiveGuides = () => {
    const getGuides = async () => {
      const guidesArr = []
      const guideIds = []
      const q = query(
        collection(db, 'guides'),
        where('isPublished', '==', true),
        orderBy('createdAt', 'desc'),
        limit(5)
      )

      const qS = await getDocs(q)
      qS.forEach((doc) => {
        guidesArr.push(doc.data())
        guideIds.push(doc.id)
      })
      setLatestGuides(guidesArr)
      setLatestGuideIds(guideIds)
    }
    getGuides()
  }

  const handleNewGuideClick = () => {
    navigate(`/guide/add`)
  }
  const handlePopTagClick = (e) => {
    navigate(`/search/${e.target.value}`)
  }

  const guideProps = { latestGuides, latestGuideIds }

  /*** styles  start ***/
  const outerDiv = {
    mt: 3,
    display: 'flex',
    flexDirection: 'column',
  }
  const dotGuide = {
    textAlign: 'center',
    color: '#cccccc',
    mb: 3,
  }
  const outerBox = {
    display: 'flex',
    justifyContent: 'center',
  }
  const outerCard = {
    borderRadius: 1,
    bgcolor: '#2f2f2f',
    width: '80%',
    border: 1.25,
    borderColor: '#353540',
  }
  const outerCardContent = {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  }
  const descriptionTypography = {
    width: '80%',
    color: '#cccccc',
    textAlign: 'center',
  }
  const popTagsBox = {
    mt: 1.5,
    display: 'flex',
    justifyContent: 'center',
  }
  const popTagsMapBox = {
    typography: 'paragraph',
    padding: 1,
    mx: 1.5,
    borderRadius: 1,
    background: '#2f2f2f',
    color: '#cccccc',
    textAlign: 'center',
    fontSize: '1.25em',
    '&:hover': { cursor: 'pointer', borderColor: '#468ef3' },
    border: 1.25,
    borderColor: '#353540',
  }
  const newGuideOuterBox = {
    mt: 1,
    display: 'flex',
    justifyContent: 'center',
  }
  const newGuideInnerBox = {
    textAlign: 'center',
    borderRadius: 25,
    my: 1.5,
    width: '40%',
    py: 2.5,
    typography: 'h4',
    border: 2,
    borderColor: '#2f2f2f',
    background: 'transparent',
    color: '#eeeeee',
    '&:hover': { cursor: 'pointer', borderColor: '#468ef3' },
  }
  const outerBoxLatestGuides = {
    display: 'flex',
    justifyContent: 'center',
  }
  const latestGuidesTypography = {
    width: '50%',
    color: '#cccccc',
    my: 1.5,
  }

  return (
    <Box id="home" style={outerDiv}>
      <Typography variant="h3" sx={dotGuide}>
        {`<dotGuide />`}
      </Typography>
      <Box sx={outerBox}>
        <Card sx={outerCard}>
          <CardContent sx={outerCardContent}>
            <Typography sx={descriptionTypography}>
              Tool for software developers to standardized guides. Developers are given a template
              for all the information you might want in a guide. A finished guide displays a
              side-by-side view of code and references that explain specific portions of the code
              block.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={popTagsBox}>
        {popularTags
          ? popularTags.map((tag, idx) => {
              return (
                <Box sx={popTagsMapBox} onClick={(e) => handlePopTagClick(e)} key={idx}>
                  <Typography>{tag}</Typography>
                </Box>
              )
            })
          : null}
      </Box>
      <Box sx={newGuideOuterBox}>
        <Box sx={newGuideInnerBox} onClick={() => handleNewGuideClick()}>
          New Guide
        </Box>
      </Box>
      <Box sx={outerBoxLatestGuides}>
        <Typography variant="h6" sx={latestGuidesTypography}>
          Latest Guides
        </Typography>
      </Box>
      {latestGuides.length ? <GuidePreview props={guideProps} /> : null}
    </Box>
  )
}

export default Home
