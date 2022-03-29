import React from 'react'
import { Card, Container } from '@mui/material/'

const Footer = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
      <Card
        sx={{ width: '52.5%', textAlign: 'center', borderRadius: 5 }}
        style={{ backgroundColor: '#2f2f2f' }}
        id="footer">
        <p style={{ color: 'white' }}>
          Web Design & Development by{' '}
          <a
            style={{ color: '#f57c00' }}
            href="https://github.com/dotArchive/dotGuide"
            target="_blank"
            rel="noopener noreferrer">
            {`<dotGuide />`}
          </a>
        </p>
      </Card>
    </Container>
  )
}

export default Footer
