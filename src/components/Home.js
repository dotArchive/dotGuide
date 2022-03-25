import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'
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

const popularTags = ['Javascript', 'React', 'Express', 'Vue.js', 'Firebase']

export const Home = () => {
  const navigate = useNavigate()

  const handleNewGuideClick = () => {
    navigate(`/guide/add`)
  }
  const handlePopTagClick = (e) => {
    navigate(`/search/${e.target.value}`)
  }

  return (
    <div id="home" style={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', color: '#cccccc', mb: 3 }}>
        About:
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ width: '80%', color: '#cccccc' }}>
          You really think you can fly that thing? What do they got in there? King Kong? Must go
          faster... go, go, go, go, go! You're a very talented young man, with your own clever
          thoughts and ideas. Do you need a manager? Hey, take a look at the earthlings. Goodbye!
          Remind me to thank John for a lovely weekend. Yeah, but your scientists were so
          preoccupied with whether or not they could, they didn't stop to think if they should. Just
          my luck, no ice. Remind me to thank John for a lovely weekend. They're using our own
          satellites against us. And the clock is ticking.
        </Typography>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        {popularTags
          ? popularTags.map((tag, idx) => {
              return (
                <Box
                  sx={{
                    typography: 'paragraph',

                    padding: 1,
                    mr: 1,
                    ml: 1,
                    borderRadius: 2.5,
                    background: '#001247',
                    color: '#eeeeee',
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
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            textAlign: 'center',
            borderRadius: 5,
            mt: 2,
            mb: 1,
            width: '80%',
            pt: 2.5,
            pb: 2.5,
            typography: 'h4',
            background: '#12D152',
            color: '#eeeeee',
            '&:hover': { cursor: 'pointer' },
          }}
          onClick={() => handleNewGuideClick()}>
          New Guide
        </Box>
      </Box>
      <Typography variant="h3" sx={{ textAlign: 'center', color: '#eeeeee' }}>
        Latest Guides
      </Typography>
      <GuidePreview props={guidePreviews} />
    </div>
  )
}

export default Home
