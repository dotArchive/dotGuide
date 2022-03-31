import React, { useState, useEffect } from 'react'
import { Typography, TextField } from '@mui/material'

export default function File(props) {
  const [fileList, setFileList] = useState([{ filepath: '' }])

  //useEffects
  useEffect(() => {
    if (props.add === true) setFileList([...fileList, { filepath: '' }])
    if (props.remove === true) fileList.pop()
  })

  // useEffect(() => {

  // });

  useEffect(() => {
    props.fileChild(fileList)
  }, [fileList])

  const handleFileChange = (e, index) => {
    const { name, value } = e.target
    const list = [...fileList]
    list[index][name] = value
    setFileList(list)
  }

  const filePathTextField = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        borderRadius: 3,
        mt: 0.5,
        mb: 0.5,
      },
    },
  }

  return (
    <div>
      <Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
        File Name
      </Typography>
      {fileList.map((singleFile, index) => (
        <div key={index}>
          <TextField
            sx={filePathTextField}
            name="filepath"
            type="text"
            id="filepath"
            variant="outlined"
            size="small"
            placeholder="Your File Name"
            value={singleFile.filepath}
            onChange={(e) => handleFileChange(e, index)}
          />
        </div>
      ))}
    </div>
  )
}
