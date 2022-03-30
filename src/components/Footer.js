import React from 'react'
import { Card, Container, Typography, Link } from '@mui/material/'

const Footer = () => {
  /*** styles  start ***/
  const outerContainer = {
    display: 'flex',
    justifyContent: 'center',
    mt: 1,
    background: 'transparent',
  }
  const outerCard = {
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'white',
  }
  const linkSX = {
    color: '#468ef0',
    '&:hover': {
      color: 'white',
    },
  }
  return (
    <Container sx={outerContainer}>
      <Card elevation={0} sx={outerCard} id="footer">
        <Typography sx={{ color: 'white' }}>
          Web Design & Development by
          <Link href="https://github.com/dotArchive/dotGuide" underline="none" sx={linkSX}>
            {` <dotGuide />`}
          </Link>
        </Typography>
      </Card>
    </Container>
  )
}

export default Footer
