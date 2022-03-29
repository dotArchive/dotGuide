import { useEffect, useState } from 'react'

function Tag(props) {
  const [tagList, setTagList] = useState([''])

  useEffect(() => {
    props.tagChild(tagList)
  }, [tagList])

  const handleTagChange = (e, index) => {
    const { value } = e.target
    const list = [...tagList]
    list[index] = value
    setTagList(list)
  }

  const handleTagRemove = (index) => {
    const list = [...tagList]
    list.splice(index, 1)
    setTagList(list)
  }

  const handleTagAdd = () => {
    setTagList([...tagList, ''])
  }

  return (
    <div className="form-field">
      <button type="button" onClick={handleTagAdd} className="add-btn">
        Add
      </button>
      <div className="flexbox">
        {tagList.map((singletag, index) => (
          <div key={index} className="tag">
            <div className="addTag">
              <input
                placeholder="Tag"
                name="tag"
                type="text"
                id="tag"
                value={singletag.tag}
                onChange={(e) => handleTagChange(e, index)}
              />

              {tagList.length !== 1 && (
                <button type="button" onClick={() => handleTagRemove(index)} className="remove-btn">
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tag
