import { useEffect, useState } from 'react'
import { Typography, TextField } from '@mui/material'

export default function File(props) {
  const [fileList, setFileList] = useState([{ filepath: '' }])

  useEffect(() => {
    if (props.guide.bodyRef) {
      let editFile = props.guide.bodyRef.filepath.map((singleFile) => {
        return singleFile
      })
      setFileList([...editFile, { filepath: '' }])
    }
  }, [props.guide.userId])

  useEffect(() => {
    if (props.add === true) setFileList([...fileList, { filepath: '' }])
  })

  useEffect(() => {
    if (props.remove === true) fileList.pop()
  })

  useEffect(() => {
    props.fileChild(fileList)
  }, [fileList])

  const handleFileChange = (e, index) => {
    const { name, value } = e.target
    const list = [...fileList]
    list[index][name] = value
    setFileList(list)
  }

  const fileListTextField = {
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
            sx={fileListTextField}
            name="filepath"
            type="text"
            id="filepath"
            variant="outlined"
            size="small"
            value={singleFile.filepath}
            onChange={(e) => handleFileChange(e, index)}
          />
        </div>
      ))}
    </div>
  )
}
