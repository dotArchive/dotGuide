import React from 'react'
import { Card, Container } from '@mui/material/'

const Footer = () => {
  return (
    <div style={{textAlign: 'center'}}>
        <p style={{ color: 'white' }}>
          Web Design & Development by{' '}
          <a
            style={{ color: '#468ef3' }}
            href="https://github.com/dotArchive/dotGuide"
            target="_blank"
            rel="noopener noreferrer">
            {`<dotGuide />`}
          </a>
        </p>
    </div>
  )
}

export default Footer
