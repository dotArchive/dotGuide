//react imports
import React, { useState, useEffect } from 'react'

//mui imports
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'

export default function Language(props) {
  const [language, setLanguage] = useState([{ language: '' }])

  useEffect(() => {
    if (props.guide.bodyRef) {
      let editLanguage = props.guide.bodyRef.language.map((singlelanguage) => {
        return singlelanguage
      })
      setLanguage([...editLanguage])
    }
  }, [props.guide.userId])

  useEffect(() => {
    if (props.add === true) setLanguage([...language, { language: '' }])
    if (props.remove === true) language.pop()
  })

  useEffect(() => {
    props.languageChild(language)
  }, [language])

  const handleLanguageChange = (e, index) => {
    const { value } = e.target
    const list = [...language]
    list[index]['language'] = value
    setLanguage(list)
  }

  const languages = [
    {
      value: 'javascript',
      name: 'JavaScript',
    },
    {
      value: 'jsx',
      name: 'JSX',
    },
    {
      value: 'xml',
      name: 'XML/HTML',
    },
    {
      value: 'css',
      name: 'CSS',
    },
    {
      value: 'markdown',
      name: 'Markdown',
    },
    {
      value: 'cobol',
      name: 'Cobol',
    },
    {
      value: 'django',
      name: 'Django',
    },
    {
      value: 'haskell',
      name: 'Haskell',
    },
    {
      value: 'pascal',
      name: 'Pascal',
    },
    {
      value: 'php',
      name: 'PHP',
    },
    {
      value: 'python',
      name: 'Python',
    },
    {
      value: 'powershell',
      name: 'Powershell',
    },
    {
      value: 'ruby',
      name: 'Ruby',
    },
    {
      value: 'rust',
      name: 'Rust',
    },
    {
      value: 'sass',
      name: 'Sass',
    },
    {
      value: 'swift',
      name: 'Swift',
    },
  ]

  const formControlSx = {
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
  const menuPropsSX = {
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
    width: '75%',
  }

  return (
    <div>
      <Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
        Language
      </Typography>
      {language.map((singleLanguage, index) => (
        <div key={index}>
          <FormControl fullWidth size="small" sx={formControlSx}>
            <Select
              key={index}
              MenuProps={menuPropsSX}
              size="small"
              id="language"
              onChange={(e) => handleLanguageChange(e, index)}
              value={singleLanguage.language}>
              {languages.map((option) => (
                <MenuItem sx={menuItemSX} key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ))}
    </div>
  )
}
