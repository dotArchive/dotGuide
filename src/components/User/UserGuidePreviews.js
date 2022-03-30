import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded'

const UserGuidePreview = (guides) => {
  const [arr, setArr] = useState([])
  const [guideIds, setGuideIds] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    setArr(guides.props.guides)
    setGuideIds(guides.props.list)
  }, [guides.props])

  const handleGuideClick = (guideId) => {
    navigate(`/guide/${guideId}`)
  }

  return (
    <>
      {arr.length
        ? arr.map((guide, idx) => {
            const { title, username, favorites, tags } = guide
            return (
              <Card
                sx={{
                  background: '#2f2f2f',
                  color: 'white',
                  borderRadius: 1,
                  my: 0.5,
                  '&:hover': { cursor: 'pointer' },
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '100%',
                  border: 1.25,
                  borderColor: '#353540',
                }}
                onClick={() => {
                  handleGuideClick(guideIds[idx])
                }}
                key={idx}>
                <CardContent
                  sx={{
                    py: 1,
                  }}>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: '1.5em', fontWeight: 'bold', textOverflow: 'ellipsis', ml: 1 }}>
                    {title ? title : null}
                  </Typography>
                  <Typography sx={{ color: '#cccccc', fontSize: '1em', ml: 1 }}>
                    {`— ${username ? username : null}`}
                    <BookmarkRoundedIcon
                      sx={{
                        ml: 2,
                        mr: 0.25,
                        fontSize: 15,
                        color: 'white',
                      }}
                    />
                    <span style={{ color: '#468ef3', fontSize: 18 }}>{`${
                      favorites ? favorites : null
                    }`}</span>
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                    }}>
                    {tags
                      ? tags.map((tag, idx) => {
                          if (idx <= 4) {
                            return (
                              <Box
                                key={idx}
                                sx={{
                                  px: 1,
                                  my: 0.5,
                                  mx: 0.5,
                                  borderRadius: 2.5,
                                  typography: 'body2',
                                  fontSize: '0.75em',
                                  background: 'transparent',
                                  color: 'white',
                                  border: 1,
                                  maxWidth: '20ch',
                                }}>
                                {tag}
                              </Box>
                            )
                          } else {
                            return null
                          }
                        })
                      : null}
                  </Box>
                </CardContent>
              </Card>
            )
          })
        : null}
    </>
  )
}

export default UserGuidePreview
