import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import BackEnd from './TechStack/BackEnd';
import FrontEnd from './TechStack/FrontEnd';
import Api from './TechStack/API';
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

	useEffect(() => {
		if (props.save === true) updateBodyName();
	});

	useEffect(() => {
		if (props.submit === true) updateBodyName();
	});

	const guideId = props.guideId;

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
				url,
				tag,
				description,
			},
		});
	};

	/*
	body = props.guide.body
		codeBlock = props.guide.body[0].codeBlock
		content = props.guide.body[0].content
		filepath = props.guide.body[0].filepath
		language = props.guide.body[0].language

	*/
	return (
		<div>
			<Title guide={props.guide} titleChild={(data) => setTitle(data)} />
			<div className="flexbox">
				<FrontEnd
					guide={props.guide}
					frontEndChild={(data) => setFrontEnd(data)}
				/>
				<BackEnd
					guide={props.guide}
					backEndChild={(data) => setBackEnd(data)}
				/>
				<Api guide={props.guide} apiChild={(data) => setApi(data)} />
				<Tag guide={props.guide} tagChild={(data) => setTags(data)} />
				<CodeURL guide={props.guide} urlChild={(data) => setUrl(data)} />
			</div>
			<GuideDescription
				guide={props.guide}
				descriptionChild={(data) => setDescription(data)}
			/>
		</div>
	);
}
