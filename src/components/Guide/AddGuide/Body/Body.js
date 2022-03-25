import { useEffect, useState } from 'react'
import CodeEditor from './Code/CodeEditor'
import Language from './Code/Language'
import Reference from './Reference/Reference'

export default function GuideBody(props) {
  const [newBodyList, setNewBodyList] = useState([''])
  const [language, setLanguage] = useState([])
  const [code, setCode] = useState([])

  const handleNewBodyChange = (e, index) => {
    const { name, value } = e.target
    const list = [...newBodyList]
    list[index][name] = value
    setNewBodyList(list)
  }

  const handleNewBodyRemove = (index) => {
    const list = [...newBodyList]
    list.splice(index, 1)
    setNewBodyList(list)
  }

  const handleNewBodyAdd = () => {
    setNewBodyList([...newBodyList, ''])
  }

  useEffect(() => {
    props.fileChild(newBodyList)
  }, [newBodyList])

  useEffect(() => {
    props.languageChild(language)
  }, [language])

  useEffect(() => {
    props.codeChild(code)
  }, [code])

  return (
    <div style={{ border: '1rem solid blue' }} className="form-field">
      {newBodyList.map((singleNewBody, index) => (
        <div key={index} className="newBody">
          <div className="addNewBody">
            <details open>
              <summary>
                <input
                  placeholder="File Name"
                  name="filePath"
                  type="text"
                  id="filePath"
                  value={singleNewBody.newBody}
                  onChange={(e) => handleNewBodyChange(e, index)}
                  required
                />
              </summary>
              <Language languageChild={(data) => setLanguage(data)}>
                <CodeEditor codeChild={(data) => setCode(data)} />
              </Language>
              <Reference />
            </details>
            <div className="removeNewBody">
              {newBodyList.length !== 1 && (
                <button
                  type="button"
                  onClick={() => handleNewBodyRemove(index)}
                  className="remove-btn">
                  <span>Remove</span>
                </button>
              )}
            </div>

            {newBodyList.length - 1 === index && (
              <button type="button" onClick={handleNewBodyAdd} className="add-btn">
                <span>Add File</span>
              </button>
            )}
          </div>

          <div></div>
        </div>
      ))}
    </div>
  )
}
