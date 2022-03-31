import { useEffect, useState } from 'react'
import { TextField } from '@mui/material'

export default function Title(props) {
  const [title, setTitle] = useState('Title*')

  useEffect(() => {
    if (props.guide.head) {
      setTitle(props.guide.head.title.toUpperCase())
    }
  }, [props.guide.userId])

  useEffect(() => {
    props.titleChild(title)
  }, [title])

  const handleTitleChange = (e) => {
    const { value } = e.target
    setTitle(value)
  }

  return (
    <TextField
      className="textField"
      sx={{
        multilineColor: 'white',
      }}
      variant="standard"
      placeholder={title}
      size="medium"
      onChange={handleTitleChange}
      name="title"
      type="text"
      id="title"
      required
    />
  )
}
