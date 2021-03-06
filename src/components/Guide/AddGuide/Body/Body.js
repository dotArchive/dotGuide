//react imports
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

//firebase imports
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../firebase'

// MUI
import {
  Typography,
  Box,
  IconButton,
  Card,
  Container,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

// Components
import Language from './Code/Language'
import CodeEditor from './Code/CodeEditor'
import CodeMirror from './Code/CodeMirror'
import Content from './Reference/Content'
import File from './File'

export default function Body(props) {
  //file attributes and content
  const [filepath, setFile] = useState([])
  const [language, setLanguage] = useState([])
  const [codeBlock, setCode] = useState([])
  const [content, setContent] = useState([])

  //select your file to view
  const [fileView, setFileView] = useState(0)

  //add remove files
  const [add, setAdd] = useState(false)
  const [remove, setRemove] = useState(false)

  //useEffects
  useEffect(() => {
    if (props.save === true) updateBody()
    if (props.submit === true) updateBody()
  })
  useEffect(() => {
    setAdd(false)
  }, [add])
  useEffect(() => {
    setRemove(false)
  }, [remove])

  let body = []
  const guideId = props.guideId

  for (let i = 0; i < filepath.length; i++) {
    let mergeData = {
      ...filepath[i],
      ...language[i],
      ...codeBlock[i],
      ...content[i],
    }
    body.push(mergeData)
  }

  const updateBody = async () => {
    const guideRef = doc(db, 'guides', guideId)
    await updateDoc(guideRef, {
      bodyRef: {
        codeBlock,
        filepath,
        content,
        language,
      },
      body,
    })
  }
  /*** styles  start ***/
  const topLevelContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    color: 'white',
  }
  const bodyCardBox = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  }
  const bodyCards = {
    background: '#2f2f2f',
    p: 1,
    pl: 2,
    pr: 2,
    width: '25%',
    minHeight: '10vh',
    textOverflow: 'ellipsis',
    border: 1.25,
    borderColor: '#353540',
    flexGrow: 1,
  }
  const codeCards = {
    background: '#2f2f2f',
    p: 1,
    pl: 2,
    mt: 1,
    overflow: 'auto',
    height: '450px',
    border: 1.25,
    borderColor: '#353540',
    color: 'white',
  }
  const addRemoveCard = {
    background: '#2f2f2f',
    ml: 2,
    mb: 1,
    border: 1.25,
    borderColor: '#353540',
  }
  const filePreviewCard = {
    background: '#2f2f2f',
    mt: 1,
    pb: 1,
    pt: 1,
    pl: 1,
    pr: 1,
    border: 1.25,
    borderColor: '#353540',
  }
  const formControlSX = {
    py: 0.5,
    mt: 0.5,
    color: 'white',
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderRadius: 3,
    },
    '& label.Mui-focused': {},
    '& label': {
      color: 'white',
    },
    '&:hover label': {
      color: '#f57c00',
    },
    '& .MuiInputBase-input': {
      color: 'white',
      py: 0.5,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderRadius: 3,
      },
      '&:focus fieldset': {
        borderRadius: 3,
      },
      '& fieldset': {
        borderColor: 'white',
        borderRadius: 3,
      },
      '&:focus .MuiInputLabel-root': {
        borderColor: '#f57c00',
        borderRadius: 3,
      },
    },
  }
  const formMenuProps = {
    PaperProps: {
      sx: {
        bgcolor: '#303035',
        color: 'white',
      },
    },
  }
  const menuItemSX = {
    py: 0,
    pl: 1,
    backgroundColor: '#cccccc55',
    fontSize: '1em',
    color: 'white',
  }
  const codeOuterBox = {
    display: 'flex',
    flexDirection: 'column',
    width: '49%',
    mx: 0.5,
  }
  const codeInnerBox = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }

  return (
    <Container sx={topLevelContainer}>
      <div className="flexbox">
        <Card sx={addRemoveCard}>
          <IconButton sx={{ marginRight: '-8px' }} size="small" onClick={() => setAdd(true)}>
            <AddCircleOutlineIcon sx={{ color: '#468ef3' }} />
          </IconButton>

          <IconButton size="small" onClick={() => setRemove(true)}>
            <RemoveCircleOutlineIcon sx={{ color: 'gray' }} />
          </IconButton>
        </Card>
      </div>
      <Box sx={bodyCardBox}>
        <Card sx={bodyCards}>
          <File fileChild={(data) => setFile(data)} add={add} remove={remove} />
        </Card>

        <Card sx={bodyCards}>
          <Language languageChild={(data) => setLanguage(data)} add={add} remove={remove} />
        </Card>

        <Card sx={bodyCards}>
          <CodeEditor codeChild={(data) => setCode(data)} add={add} remove={remove} />
        </Card>
        <Card sx={bodyCards}>
          <Content contentChild={(data) => setContent(data)} add={add} remove={remove} />
        </Card>
      </Box>

      <div className="file Preview">
        <Card sx={filePreviewCard}>
          <FormControl fullWidth label="Language" size="small" sx={formControlSX}>
            <InputLabel>File Path</InputLabel>
            <Select
              MenuProps={formMenuProps}
              size="small"
              label={'File Path'}
              id="language"
              onChange={(e) => setFileView(e.target.value)}
              value={fileView}>
              {body.map((file, idx) => (
                <MenuItem key={idx} disableGutters={true} dense={true} sx={menuItemSX} value={idx}>
                  {file.filepath}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={codeOuterBox}>
            <Card sx={codeCards}>
              <Box sx={codeInnerBox}>
                <Typography sx={{ color: 'white', fontSize: '0.75em' }}>
                  {body[fileView] ? body[fileView].filepath : ''}
                </Typography>

                <Box sx={{ ml: 2 }}>
                  <Typography sx={{ color: 'white', fontSize: '0.75em' }}>
                    {body[fileView] ? body[fileView].language.toUpperCase() : ''}
                  </Typography>
                </Box>
              </Box>
              <CodeMirror
                language={body[fileView] ? body[fileView].language : ''}
                value={body[fileView] ? body[fileView].codeBlock : ''}
              />
            </Card>
          </Box>
          <Box sx={{ width: '51%', mx: 0.5 }}>
            <Card sx={codeCards}>
              <ReactMarkdown>{body[fileView] ? body[fileView].content : ''}</ReactMarkdown>
            </Card>
          </Box>
        </Box>
      </div>
    </Container>
  )
}
