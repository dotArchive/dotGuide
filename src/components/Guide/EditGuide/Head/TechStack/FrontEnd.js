import { useEffect, useState } from 'react'
import { Typography, IconButton, TextField, InputAdornment } from '@mui/material'

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

function FrontEnd(props) {
  const [frontEndList, setFrontEndList] = useState([{ frontEnd: '' }])

  useEffect(() => {
    if (props.guide.head) {
      if (props.guide.head.frontEnd) {
        let editFrontEnd = props.guide.head.frontEnd.map((singleFrontEnd) => {
          return singleFrontEnd
        })
        setFrontEndList([...editFrontEnd])
      }
    }
  }, [props.guide.userId])

  useEffect(() => {
    props.frontEndChild(frontEndList)
  }, [frontEndList])

  const handleFrontEndChange = (e, index) => {
    const { name, value } = e.target
    const list = [...frontEndList]
    list[index][name] = value
    setFrontEndList(list)
  }

  const handleFrontEndRemove = (index) => {
    const list = [...frontEndList]
    list.splice(index, 1)
    setFrontEndList(list)
  }

  const handleFrontEndAdd = () => {
    setFrontEndList([...frontEndList, { frontEnd: '' }])
  }

  const frontEndTextField = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        borderRadius: 3,
        mt: 0.5,
        mb: 0.5,
      },
      '& adornedEnd': {
        pr: 0,
      },
    },
  }

  return (
    <div className="form-field">
      <div className="flexbox" style={{ paddingRight: '2rem' }}>
        <IconButton sx={{ paddingLeft: '2.5px' }} size="small" onClick={handleFrontEndAdd}>
          <AddCircleOutlineIcon sx={{ color: '#468ef3' }} />
        </IconButton>

        <Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
          Front End
        </Typography>
      </div>

      {frontEndList.map((singleFrontEnd, index) => (
        <TextField
          key={index}
          sx={frontEndTextField}
          name="frontEnd"
          type="text"
          id="frontEnd"
          onChange={(e) => handleFrontEndChange(e, index)}
          variant="outlined"
          value={singleFrontEnd.frontEnd}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment style={{ marginLeft: '-15px' }} position="start">
                <IconButton size="small" onClick={() => handleFrontEndRemove(index)}>
                  <RemoveCircleOutlineIcon sx={{ color: 'gray' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ))}
    </div>
  )
}

export default FrontEnd
