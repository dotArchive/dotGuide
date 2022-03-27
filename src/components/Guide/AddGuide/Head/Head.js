import React, { useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../firebase'
import BackEnd from './TechStack/BackEnd'
import FrontEnd from './TechStack/FrontEnd'
import Api from './TechStack/API'
import Title from './Title'
import Tag from './Tag'
import GuideDescription from './GuideDescription'
import CodeURL from './CodeURL'

export default function Head(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [urls, setUrl] = useState([])
  const [apis, setApi] = useState([])
  const [frontEnds, setFrontEnd] = useState([])
  const [backEnds, setBackEnd] = useState([])

  useEffect(() => {
    if (props.save === true) updateBodyName()
  })

  useEffect(() => {
    if (props.submit === true) updateBodyName()
  })

  const guideId = props.guideId

  const tag = tags.map((tag) => {
    return tag
  })
  const url = urls.map((url) => {
    return url
  })
  const API = apis.map((API) => {
    return API
  })
  const frontEnd = frontEnds.map((frontEnd) => {
    return frontEnd
  })
  const backEnd = backEnds.map((backEnd) => {
    return backEnd
  })

  const updateBodyName = async () => {
    const guideRef = doc(db, 'guides', guideId)
    await updateDoc(guideRef, {
      title,
      API,
      frontEnd,
      backEnd,
      url,
      tags: tag,
      description,
      languages: [],
    })
  }

  // useEffect(() => {
  // 	props.titleChild(title);
  // }, [title]);

  // useEffect(() => {
  // 	props.descriptionChild(description);
  // }, [description]);

  // useEffect(() => {
  // 	props.tagChild(tag);
  // }, [tag]);

  // useEffect(() => {
  // 	props.urlChild(url);
  // }, [url]);

  // useEffect(() => {
  // 	props.apiChild(api);
  // }, [api]);

  // useEffect(() => {
  // 	props.frontEndChild(frontEnd);
  // }, [frontEnd]);

  // useEffect(() => {
  // 	props.backEndChild(backEnd);
  // }, [backEnd]);

  return (
    <div>
      <Title titleChild={(data) => setTitle(data)} />
      <div className="flexbox">
        <FrontEnd frontEndChild={(data) => setFrontEnd(data)} />
        <BackEnd backEndChild={(data) => setBackEnd(data)} />
        <Api apiChild={(data) => setApi(data)} />
        <Tag tagChild={(data) => setTags(data)} />
        <CodeURL urlChild={(data) => setUrl(data)} />
      </div>
      <GuideDescription descriptionChild={(data) => setDescription(data)} />
    </div>
  )
}
