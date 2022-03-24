import React, { useEffect, useState } from 'react';
import BackEnd from './TechStack/BackEnd';
import FrontEnd from './TechStack/FrontEnd';
import API from './TechStack/API';
import Title from './Title';
import Tag from './Tag';
import GuideDescription from './GuideDescription';
import CodeURL from './CodeURL';

export default function Head(props) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tag, setTag] = useState([]);
	const [url, setUrl] = useState([]);
	const [api, setApi] = useState([]);
	const [frontEnd, setFrontEnd] = useState([]);
	const [backEnd, setBackEnd] = useState([]);

	useEffect(() => {
		props.titleChild(title);
	}, [title]);

	useEffect(() => {
		props.descriptionChild(description);
	}, [description]);

	useEffect(() => {
		props.tagChild(tag);
	}, [tag]);

	useEffect(() => {
		props.urlChild(url);
	}, [url]);

	useEffect(() => {
		props.apiChild(api);
	}, [api]);

	useEffect(() => {
		props.frontEndChild(frontEnd);
	}, [frontEnd]);

	useEffect(() => {
		props.backEndChild(backEnd);
	}, [backEnd]);

	return (
		<div>
			<Title titleChild={(data) => setTitle(data)} />
			<FrontEnd frontEndChild={(data) => setFrontEnd(data)} />
			<BackEnd backEndChild={(data) => setBackEnd(data)} />
			<API apiChild={(data) => setApi(data)} />
			<Tag tagChild={(data) => setTag(data)} />
			<CodeURL urlChild={(data) => setUrl(data)} />
			<GuideDescription descriptionChild={(data) => setDescription(data)} />
		</div>
	);
}
