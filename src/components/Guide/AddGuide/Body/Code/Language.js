import React, { useState, useEffect } from 'react'

export default function Language(props) {
  const [language, setLanguage] = useState([{ language: '' }])
  useEffect(() => {
    if (props.add === true) setLanguage([...language, { language: '' }])
  })

  useEffect(() => {
    if (props.remove === true) language.pop()
  })

  useEffect(() => {
    props.languageChild(language)
  }, [language])

  const handleLanguageChange = (e, index) => {
    const { name, value } = e.target
    const list = [...language]
    list[index][name] = value
    setLanguage(list)
  }

  return (
    <div>
      {language.map((singleLanguage, index) => (
        <div key={index}>
          <select
            onChange={(e) => handleLanguageChange(e, index)}
            name="language"
            id="language"
            value={singleLanguage.language}>
            <option value="">Language</option>
            <option value="javascript">JavaScript</option>
            <option value="jsx">JSX</option>
            <option value="xml">XML/HTML</option>
            <option value="css">CSS</option>
            <option value="markdown">Markdown</option>
            <option value="cobol">Cobol</option>
            <option value="django">Django</option>
            <option value="haskell">Haskell</option>
            <option value="pascal">Pascal</option>
            <option value="php">PHP</option>
            <option value="python">Python</option>
            <option value="powershell">Powershell</option>
            <option value="ruby">Ruby</option>
            <option value="rust">Rust</option>
            <option value="sass">SASS</option>
            <option value="swift">Swift</option>
          </select>
        </div>
      ))}
    </div>
  )
}
