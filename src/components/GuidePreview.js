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
  }, [])

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
                  borderRadius: 10,
                  margin: 1,
                  '&:hover': { cursor: 'pointer' },
                  maxWidth: '80%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onClick={() => handleGuideClick(guideId)}
                key={idx}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                    {title ? title : null}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8em' }}>
                    {`— ${username ? username : null}
          (favIcon) ${favorites ? favorites : null}`}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {tags
                      ? tags.map((tag, idx) => {
                          return (
                            <Box
                              key={idx}
                              sx={{
                                pr: 1,
                                pl: 1,
                                // pt: 0.5,
                                // pb: 0.5,
                                margin: 1,
                                border: 1,
                                borderRadius: 2.5,
                                typography: 'body2',
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
