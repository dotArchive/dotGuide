import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, doc, getDocs, query, orderBy, where, limit } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import GuidePreview from './GuidePreview'

const guidePreviews = [
  {
    title: 'guide1 - how to a',
    username: 'leeroyJenkins',
    favorites: 23,
    tags: ['tagA', 'tagB', 'tagC', 'tagD', 'tageE'],
    guideId: 23,
  },
  {
    title: 'guide2 - how to b',
    username: 'Howitzer',
    favorites: 567,
    tags: ['tagE', 'tagA', 'tagD', 'tagF', 'tagG'],
    guideId: 24,
  },
  {
    title: 'guide3 - how to c',
    username: 'YouWishYouWereMe',
    favorites: 9999,
    tags: ['tagA', 'tagF', 'tagD', 'tagC', 'PikaPii'],
    guideId: 25,
  },
  {
    title: 'guide4 - how to d',
    username: 'AttackOnFullstack',
    favorites: 2,
    tags: ['tagF', 'tagC', 'tagB', 'tagA', 'TagJ'],
    guideId: 26,
  },
  {
    title: 'guide5 - how to e',
    username: '0m4R',
    favorites: 48,
    tags: ['tagG', 'tagX', 'tagZ', 'tagF', 'tagNine'],
    guideId: 27,
  },
]

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

  useEffect(() => {
    getLatestFiveGuides()
  }, [])

  const getLatestFiveGuides = () => {
    const getGuides = async () => {
      const guidesArr = []
      const q = query(
        collection(db, 'guides'),
        where('isPublished', '==', true),
        orderBy('createdAt'),
        limit(5)
      )

      const qS = await getDocs(q)
      qS.forEach((doc) => {
        guidesArr.push(doc.data())
      })
      setLatestGuides(guidesArr)
    }
    getGuides()
  }

  const handleNewGuideClick = () => {
    navigate(`/guide/add`)
  }
  const handlePopTagClick = (e) => {
    navigate(`/search/${e.target.value}`)
  }

  return (
    <div id="home" style={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
      {console.log(latestGuides)}
      <Typography variant="h3" sx={{ textAlign: 'center', color: '#cccccc', mb: 3 }}>
        {`<dotGuide />`}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          sx={{
            borderRadius: 5,
            bgcolor: '#2f2f2f',
            width: '80%',
          }}>
          <CardContent
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Typography sx={{ width: '80%', color: '#cccccc', textAlign: 'center' }}>
              Tool for software developers to standardized guides. Developers are given a template
              for all the information you might want in a guide. A finished guide displays a
              side-by-side view of code and reference’s that explain specific portions of the code
              block.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'center' }}>
        {popularTags
          ? popularTags.map((tag, idx) => {
              return (
                <Box
                  sx={{
                    typography: 'paragraph',
                    padding: 1,
                    mx: 1.5,
                    borderRadius: 2.5,
                    background: '#2f2f2f',
                    color: '#cccccc',
                    textAlign: 'center',
                    fontSize: '1.25em',
                    '&:hover': { cursor: 'pointer' },
                  }}
                  onClick={(e) => handlePopTagClick(e)}
                  key={idx}>
                  <Typography>{tag}</Typography>
                </Box>
              )
            })
          : null}
      </Box>
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            textAlign: 'center',
            borderRadius: 5,
            my: 1.5,
            width: '50%',
            py: 2.5,
            typography: 'h4',
            background: '#468ef3',
            color: '#eeeeee',
            '&:hover': { cursor: 'pointer' },
          }}
          onClick={() => handleNewGuideClick()}>
          New Guide
        </Box>
      </Box>
      <Typography variant="h3" sx={{ textAlign: 'center', color: '#cccccc', my: 1.5 }}>
        Latest Guides
      </Typography>
      {latestGuides.length ? <GuidePreview props={latestGuides} /> : null}
    </div>
  )
}

export default Home
