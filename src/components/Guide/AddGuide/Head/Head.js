import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import BackEnd from './TechStack/BackEnd';
import FrontEnd from './TechStack/FrontEnd';
import Api from './TechStack/API';
import Language from './TechStack/Language';
import Title from './Title';
import Tag from './Tag';
import GuideDescription from './GuideDescription';
import CodeURL from './CodeURL';
import ReactMarkdown from 'react-markdown';

export default function Head(props) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState([]);
	const [urls, setUrl] = useState([]);
	const [apis, setApi] = useState([]);
	const [frontEnds, setFrontEnd] = useState([]);
	const [backEnds, setBackEnd] = useState([]);
	const [languages, setLanguages] = useState([]);

	useEffect(() => {
		if (props.save === true) updateHead();
	});

	useEffect(() => {
		if (props.submit === true) updateHead();
	});

	let username = props.username;
	const guideId = props.guideId;

	const language = languages.map((language) => {
		return language;
	});
	const tag = tags.map((tag) => {
		return tag;
	});
	const url = urls.map((url) => {
		return url;
	});
	const API = apis.map((API) => {
		return API;
	});
	const frontEnd = frontEnds.map((frontEnd) => {
		return frontEnd;
	});
	const backEnd = backEnds.map((backEnd) => {
		return backEnd;
	});

	const updateHead = async () => {
		const guideRef = doc(db, 'Guide', guideId);
		await updateDoc(guideRef, {
			title,
			description,
			head: {
				API,
				frontEnd,
				backEnd,
				language,
				url,
				tag,
			},
			search: {
				API,
				frontEnd,
				backEnd,
				language,
				url,
				tag,
				title,
				username,
			},
		});
	};

	return (
		<div>
			<Title titleChild={(data) => setTitle(data)} />
			<GuideDescription descriptionChild={(data) => setDescription(data)} />
			<div className="flexbox">
				<Language languageChild={(data) => setLanguages(data)} />
				<FrontEnd frontEndChild={(data) => setFrontEnd(data)} />
				<BackEnd backEndChild={(data) => setBackEnd(data)} />
				<Api apiChild={(data) => setApi(data)} />
			</div>
			<Tag tagChild={(data) => setTags(data)} />

			<CodeURL urlChild={(data) => setUrl(data)} />
			<details>
				<summary>Header Preview</summary>
				<h1>{title}</h1>
				<ReactMarkdown>{description}</ReactMarkdown>
				<div className="flexbox">
					<div>
						{languages.map((singleLanguage, index) => {
							return <div key={index}>{singleLanguage.language}</div>;
						})}
					</div>
					<div>
						{frontEnd.map((singlefrontEnd, index) => {
							return <div key={index}>{singlefrontEnd.frontEnd}</div>;
						})}
					</div>
					<div>
						{backEnd.map((singlebackEnd, index) => {
							return <div key={index}>{singlebackEnd.backEnd}</div>;
						})}
					</div>
					<div>
						{API.map((singleAPI, index) => {
							return <div key={index}>{singleAPI.API}</div>;
						})}
					</div>
				</div>
				<div className="flexbox">
					{tag.map((singletag, index) => {
						return <div key={index}>{singletag.tag}</div>;
					})}
				</div>
				<div className="flexbox">
					{url.map((singleurl, index) => {
						return <div key={index}>{singleurl.URL}</div>;
					})}
				</div>
			</details>
		</div>
	);
}
