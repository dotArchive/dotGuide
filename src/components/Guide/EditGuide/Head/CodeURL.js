import { useEffect, useState } from 'react'
import { Typography, IconButton, TextField, InputAdornment } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

function CodeURL(props) {
  const [codeURL, setcodeURL] = useState([{ URL: '' }])

  useEffect(() => {
    if (props.guide.head) {
      if (props.guide.head.url) {
        let editUrl = props.guide.head.url.map((singleUrl) => {
          return singleUrl
        })
        setcodeURL([...editUrl])
      }
    }
  }, [props.guide.userId])

  useEffect(() => {
    props.urlChild(codeURL)
  }, [codeURL])

  const handleURLChange = (e, index) => {
    const { name, value } = e.target
    const list = [...codeURL]
    list[index][name] = value
    setcodeURL(list)
  }

  const handleURLRemove = (index) => {
    const list = [...codeURL]
    list.splice(index, 1)
    setcodeURL(list)
  }

  const handleURLAdd = () => {
    setcodeURL([...codeURL, { URL: '' }])
  }

  const codeTextField = {
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
      <div className="flexbox">
        <IconButton sx={{ paddingLeft: '2.5px' }} size="small" onClick={handleURLAdd}>
          <AddCircleOutlineIcon sx={{ color: '#468ef3' }} />
        </IconButton>
        <Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
          URLs
        </Typography>
      </div>
      <div className="flexbox" style={{ flexWrap: 'wrap' }}>
        {codeURL.map((singleURL, index) => (
          <div key={index}>
            <TextField
              key={index}
              sx={codeTextField}
              name="URL"
              type="text"
              id="URL"
              onChange={(e) => handleURLChange(e, index)}
              variant="outlined"
              value={singleURL.URL}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment style={{ marginLeft: '-15px' }} position="start">
                    <IconButton size="small" onClick={() => handleURLRemove(index)}>
                      <RemoveCircleOutlineIcon sx={{ color: 'gray' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CodeURL
