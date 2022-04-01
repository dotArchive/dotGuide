import React, { useEffect, useState } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../firebase';

// Components
import BackEnd from './TechStack/BackEnd';
import FrontEnd from './TechStack/FrontEnd';
import Api from './TechStack/API';
import Language from './TechStack/Language';
import Title from './Title';
import Tag from './Tag';
import GuideDescription from './GuideDescription';
import CodeURL from './CodeURL';

//MUI
import { Typography, Box, Card, Container } from '@mui/material';

export default function Head(props) {
	//head top
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	//head middle
	const [languages, setLanguages] = useState([]);
	const [frontEnds, setFrontEnd] = useState([]);
	const [backEnds, setBackEnd] = useState([]);
	const [apis, setApi] = useState([]);

	// head bottom
	const [tags, setTags] = useState([]);
	const [urls, setUrl] = useState([]);

	//useEffects
	useEffect(() => {
		if (props.save === true) updateHead();
	});

	useEffect(() => {
		if (props.submit === true) updateHead();
	});

	const username = props.username;
	const guideId = props.guideId;
	let search = [];

	// passing data on to database
	// top head data
	const language = languages.map((language) => {
		search.push(language.language.toLowerCase());
		return language;
	});
	const frontEnd = frontEnds.map((frontEnd) => {
		search.push(frontEnd.frontEnd.toLowerCase());
		return frontEnd;
	});
	const backEnd = backEnds.map((backEnd) => {
		search.push(backEnd.backEnd.toLowerCase());
		return backEnd;
	});
	const API = apis.map((API) => {
		search.push(API.API.toLowerCase());
		return API;
	});

	//bottom head data
	const url = urls.map((url) => url);
	const tag = tags.map((tag) => {
		search.push(tag.tag.toLowerCase());
		return tag;
	});

	const updateHead = async () => {
		search.push(title.toLowerCase());
		const guideRef = doc(db, 'guides', guideId);
		await updateDoc(guideRef, {
			head: {
				title,
				description,
				API,
				frontEnd,
				backEnd,
				language,
				url,
				tag,
			},
			search,
			createdAt: serverTimestamp(),
		});
	};

	/*** styles  start ***/
	const topLevelContainer = {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
		color: 'white',
	};
	const titleCard = {
		background: '#2f2f2f',
		p: 1,
		pl: 2,
		pr: 2,
		border: 1.25,
		borderColor: '#353540',
		mb: '0.5rem',
	};
	const usernameTypography = {
		height: 25,
		color: 'white',
		fontSize: '0.75em',
	};
	const headCards = {
		background: '#2f2f2f',
		p: 1,
		pl: 2,
		pr: 2,
		mb: 1,
		width: '25%',
		minHeight: '10vh',
		textOverflow: 'ellipsis',
		border: 1.25,
		borderColor: '#353540',
		flexGrow: 1,
	};
	const headBox = {
		display: 'flex',
		justifyContent: 'space-between',
		gap: '10px',
	};
	const tagUrlCards = {
		background: '#2f2f2f',
		border: 1.25,
		borderColor: '#353540',
		flexGrow: 1,
		p: 1,
		pl: 2,
		pr: 2,
		width: '50%',
	};
	const tagUrlBox = {
		display: 'flex',
		mb: 1,
		justifyContent: 'space-between',
		gap: '10px',
	};

	return (
		<Container sx={topLevelContainer}>
			<Title titleChild={(data) => setTitle(data)} />
			<Card sx={titleCard}>
				<div className="flexbox" style={{ justifyContent: 'space-between' }}>
					<Typography sx={usernameTypography}>{username}</Typography>
					<div></div>
				</div>

				<GuideDescription descriptionChild={(data) => setDescription(data)} />
			</Card>
			<Typography sx={{ color: 'white', ml: 1 }}></Typography>
			<Box sx={headBox}>
				<Card sx={headCards}>
					<Language languageChild={(data) => setLanguages(data)} />
				</Card>
				<Card sx={headCards}>
					<FrontEnd frontEndChild={(data) => setFrontEnd(data)} />
				</Card>
				<Card sx={headCards}>
					<BackEnd backEndChild={(data) => setBackEnd(data)} />
				</Card>
				<Card sx={headCards}>
					<Api apiChild={(data) => setApi(data)} />
				</Card>
			</Box>
			<Box sx={tagUrlBox}>
				<Card sx={tagUrlCards}>
					<Tag tagChild={(data) => setTags(data)} />
				</Card>
				<Card sx={tagUrlCards}>
					<CodeURL urlChild={(data) => setUrl(data)} />
				</Card>
			</Box>
		</Container>
	);
}
