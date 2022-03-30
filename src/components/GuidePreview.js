import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded'

const GuidePreview = (guides) => {
  const [arr, setArr] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setArr(guides.props)
  }, [guides.props])

  const handleGuideClick = (guideId) => {
    navigate(`/guide/${guideId}`)
  }
  /*** styles  start ***/
  const outerCard = {
    background: '#2f2f2f',
    color: 'white',
    borderRadius: 1,
    mx: 1,
    my: 0.5,
    '&:hover': { cursor: 'pointer', border: 1, borderColor: '#468ef3' },
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-start',
    border: 1.25,
    borderColor: '#353540',
  }
  const titleTypography = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    textOverflow: 'ellipsis',
    ml: 1,
  }
  const usernameTypography = {
    color: '#cccccc',
    fontSize: '1em',
    ml: 1,
  }
  const bookmarkSX = {
    ml: 2,
    mr: 0.25,
    fontSize: 15,
    color: 'white',
  }
  const tagBox = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  }
  const tagTypography = {
    px: 1,
    my: 0.5,
    mx: 0.5,
    borderRadius: 2.5,
    typography: 'body2',
    fontSize: '0.75em',
    color: 'white',
    border: 1,
    backgroundColor: 'transparent',
    maxWidth: '100%',
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {arr.length
        ? arr.map((guide, idx) => {
            const { title, username, tags, guideId } = guide

            return (
              <Card sx={outerCard} onClick={() => handleGuideClick(guideId)} key={idx}>
                {console.log(guide)}
                <CardContent
                  sx={{
                    py: 1,
                  }}>
                  <Typography variant="h5" sx={titleTypography}>
                    {title ? title : null}
                  </Typography>
                  <Typography sx={usernameTypography}>
                    {`— ${username ? username : null}`}
                    <BookmarkRoundedIcon sx={bookmarkSX} />
                    <span style={{ color: '#468ef3', fontSize: 18 }}>{`${
                      guide.favorites !== null ? guide.favorites : null
                    }`}</span>
                  </Typography>
                  <Box sx={tagBox}>
                    {tags
                      ? tags.map((tag, idx) => {
                          return idx <= 4 ? (
                            <Typography key={idx} sx={tagTypography}>
                              {tag}
                            </Typography>
                          ) : null
                        })
                      : null}
                  </Box>
                </CardContent>
              </Card>
            )
          })
        : null}
    </div>
  )
}

export default GuidePreview
