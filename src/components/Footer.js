import React from 'react'
import { Card, Container, Typography, Link } from '@mui/material/'

const Footer = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', mt: 1, background: 'transparent' }}>
      <Card
        elevation="none"
        sx={{ width: '100%', textAlign: 'center', backgroundColor: 'transparent', color: 'white' }}
        id="footer">
        <Typography sx={{ color: 'white' }}>
          Web Design & Development by
          <Link
            href="https://github.com/dotArchive/dotGuide"
            underline="none"
            sx={{ color: '#468ef0', '&:hover': { color: 'white' } }}>
            {` <dotGuide />`}
          </Link>
        </Typography>
      </Card>
    </Container>
  )
}

export default Footer
