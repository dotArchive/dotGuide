import React, { useState, useEffect } from 'react'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import Typography from '@mui/material/Typography'

export default function Content(props) {
  const [contentList, setContentList] = useState([{ content: '' }])

  //useEffects
  useEffect(() => {
    if (props.add === true) setContentList([...contentList, { content: '' }])
    if (props.remove === true) contentList.pop()
  })
  useEffect(() => {
    props.contentChild(contentList)
  }, [contentList])

  //event handling
  const handleContentChange = (e, index) => {
    const { name, value } = e.target
    const list = [...contentList]
    list[index][name] = value
    setContentList(list)
  }

  //mui style constants
  const contentListTypography = {
    color: 'white',
    fontSize: '0.7em',
    minHeight: 18,
    p: 0.5,
    mt: 0.5,
    mb: 0.5,
    border: 1,
    borderColor: 'transparent',
    borderRadius: 3,
    textAlign: 'center',
    textOverflow: 'ellipsis',
    display: 'flex',
    flexWrap: 'wrap',
  }

  return (
    <div>
      <Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
        Reference
      </Typography>
      {contentList.map((singleContent, index) => (
        <div key={index}>
          <Typography sx={contentListTypography}>
            <TextareaAutosize
              className="textArea"
              name="content"
              id="content"
              placeholder="Reference"
              value={singleContent.content}
              onChange={(e) => handleContentChange(e, index)}
            />
          </Typography>
        </div>
      ))}
    </div>
  )
}
