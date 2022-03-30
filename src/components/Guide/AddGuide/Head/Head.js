import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
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

	let search = [];
	const username = props.username;
	const guideId = props.guideId;

	const language = languages.map((language) => {
		search.push(language);
		return language;
	});
	const tag = tags.map((tag) => {
		search.push(tag.tag);
		return tag;
	});
	const url = urls.map((url) => {
		search.push(url);
		return url;
	});

	const API = apis.map((API) => {
		search.push(API.API);
		return API;
	});

	const frontEnd = frontEnds.map((frontEnd) => {
		search.push(frontEnd.frontEnd);
		return frontEnd;
	});
	const backEnd = backEnds.map((backEnd) => {
		search.push(backEnd.backEnd);
		return backEnd;
	});

	const updateHead = async () => {
		search.push(title);
		search.push(username);
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
	const headCards = {
		background: '#2f2f2f',
		p: 1,
		pl: 2,
		pr: 2,
		// mr: 1,
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
					<Typography sx={{ height: 25, color: 'white', fontSize: '0.75em' }}>
						{username}
					</Typography>
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
			<Typography sx={{ color: 'white', mt: 1, ml: 1 }}></Typography>
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
