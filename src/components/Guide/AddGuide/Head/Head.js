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
		if (props.save === true) updateBodyName();
	});

	useEffect(() => {
		if (props.submit === true) updateBodyName();
	});

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

	const updateBodyName = async () => {
		const guideRef = doc(db, 'Guide', guideId);
		await updateDoc(guideRef, {
			title,
			head: {
				API,
				frontEnd,
				backEnd,
				language,
				url,
				tag,
				description,
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
				<Tag tagChild={(data) => setTags(data)} />
			</div>
			<CodeURL urlChild={(data) => setUrl(data)} />
		</div>
	);
}
