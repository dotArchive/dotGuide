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
//MUI
import {
	Typography,
	Box,
	IconButton,
	Button,
	Card,
	Container,
} from '@mui/material';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';

export default function Head(props) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState([]);
	const [urls, setUrl] = useState([]);
	const [apis, setApi] = useState([]);
	const [frontEnds, setFrontEnd] = useState([]);
	const [backEnds, setBackEnd] = useState([]);
	const [languages, setLanguages] = useState([]);
	const [isFavorite, setIsFavorite] = useState(false);

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
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignContent: 'center',
				justifyContent: 'center',
			}}
		>
			<Title titleChild={(data) => setTitle(data)} />
			<Card
				sx={{
					background: '#2f2f2f',
					p: 1,
					pl: 2,
					pr: 2,
					border: 1.25,
					borderColor: '#353540',
				}}
			>
				<Typography sx={{ color: 'white', fontSize: '0.75em' }}>
					{`${username} — Tue Mar 22 2022 18:00`}
				</Typography>
				<IconButton>
					{isFavorite ? (
						<BookmarkRoundedIcon
							sx={{ color: 'red' }}
							onClick={() => setIsFavorite(!isFavorite)}
						/>
					) : (
						<BookmarkBorderRoundedIcon
							sx={{ color: 'white' }}
							onClick={() => setIsFavorite(!isFavorite)}
						/>
					)}
				</IconButton>
				<IconButton>
					<ModeEditSharpIcon sx={{ color: 'white' }} />
				</IconButton>

				<GuideDescription descriptionChild={(data) => setDescription(data)} />
			</Card>
			<Typography sx={{ color: 'white', ml: 1 }}>Technologies Used</Typography>
			<Box
				sx={{
					display: 'flex',
					// flexDirection: 'row',
					justifyContent: 'space-between',
					// alignContent: 'center',
				}}
			>
				<Card
					sx={{
						background: '#2f2f2f',
						p: 1,
						pl: 2,
						pr: 2,
						mr: 1,
						width: '25%',
						minHeight: '10vh',
						textOverflow: 'ellipsis',
						border: 1.25,
						borderColor: '#353540',
					}}
				>
					<Language languageChild={(data) => setLanguages(data)} />
				</Card>
				<FrontEnd frontEndChild={(data) => setFrontEnd(data)} />
				<BackEnd backEndChild={(data) => setBackEnd(data)} />
				<Api apiChild={(data) => setApi(data)} />
			</Box>
			<Typography sx={{ color: 'white', mt: 1, ml: 1 }}>Other Tags</Typography>
			<Card
				sx={{
					background: '#2f2f2f',
					// mt: 0,
					border: 1.25,
					borderColor: '#353540',
				}}
			>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
					<Tag tagChild={(data) => setTags(data)} />
				</Box>
			</Card>
			<Typography sx={{ color: 'white', mt: 1, ml: 1 }}>URLs</Typography>
			<Card
				sx={{
					background: '#2f2f2f',
					// mt: 0,
					border: 1.25,
					borderColor: '#353540',
				}}
			>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
					<CodeURL urlChild={(data) => setUrl(data)} />
				</Box>
			</Card>

			<details>
				<summary>Header Preview</summary>
				<Typography variant="h3" sx={{ color: 'white', ml: 1 }}>
					{title}
				</Typography>

				{`${username} — Tue Mar 22 2022 18:00`}
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
		</Container>
	);
}
