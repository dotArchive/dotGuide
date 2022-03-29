import React, { useState, useEffect } from 'react'

export default function Language(props) {
  const [language, setLanguage] = useState([''])

  useEffect(() => {
    props.languageChild(language)
  }, [language])

  const handleLanguageChange = (e, index) => {
    const { value } = e.target
    const list = [...language]
    list[index] = value
    setLanguage(list)
  }

  const handleLanguageRemove = (index) => {
    const list = [...language]
    list.splice(index, 1)
    setLanguage(list)
  }

  const handleLanguageAdd = () => {
    setLanguage([...language, ''])
  }

  return (
    <div>
      <button type="button" onClick={handleLanguageAdd} className="add-btn">
        Add
      </button>
      {language.map((singleLanguage, index) => (
        <div key={index}>
          <input
            placeholder="Programming Language"
            name="language"
            id="language"
            type="text"
            value={singleLanguage.language}
            onChange={(e) => handleLanguageChange(e, index)}
          />

          {language.length !== 1 && (
            <button
              type="button"
              onClick={() => handleLanguageRemove(index)}
              className="remove-btn">
              <span>Remove</span>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
