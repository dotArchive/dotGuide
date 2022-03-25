import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const GuidePreview = (guides) => {
  const [arr, setArr] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setArr(guides.props)
  }, [guides.props])

  const handleGuideClick = (guideId) => {
    navigate(`/guide/${guideId}`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {arr
        ? arr.map((guide, idx) => {
            const { title, username, favorites, tags, guideId } = guide

            return (
              <Card
                sx={{
                  background: '#001247',
                  color: 'white',
                  borderRadius: 10,
                  margin: 1,
                  '&:hover': { cursor: 'pointer' },
                  width: '80%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
                onClick={() => handleGuideClick(guideId)}
                key={idx}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: '1.85em', fontWeight: 'bold', textOverflow: 'ellipsis' }}>
                    {title ? title : null}
                  </Typography>
                  <Typography sx={{ fontSize: '1.25em' }}>
                    {`— ${username ? username : null}
          (favIcon) `}
                    <span style={{ color: '#12D152' }}>{`${favorites ? favorites : null}`}</span>
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {tags
                      ? tags.map((tag, idx) => {
                          return (
                            <Box
                              key={idx}
                              sx={{
                                pr: 1.5,
                                pl: 1.5,
                                mt: 0.5,
                                // pb: 0.5,
                                borderRadius: 2.5,
                                typography: 'body2',
                                fontSize: '1em',
                                background: '#12D152',
                                color: 'white',
                                maxWidth: '100%',
                              }}>
                              {tag}
                            </Box>
                          )
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
