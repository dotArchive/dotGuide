import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import Language from './Code/Language';
import CodeEditor from './Code/CodeEditor';
import CodeMirror from './Code/CodeMirror';
import Content from './Reference/Content';
import File from './File';
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
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ClassNames } from '@emotion/react';

export default function Body(props) {
	const [filepath, setFile] = useState([]);
	const [language, setLanguage] = useState([]);
	const [codeBlock, setCode] = useState([]);
	const [content, setContent] = useState([]);
	const [add, setAdd] = useState(false);
	const [remove, setRemove] = useState(false);

	useEffect(() => {
		setAdd(false);
	}, [add]);

	useEffect(() => {
		setRemove(false);
	}, [remove]);


	useEffect(() => {
		if (props.save === true) {
			console.log('updating body, save');
			updateBody();
		}
	});

	useEffect(() => {
		if (props.submit === true) {
			console.log('updating body, publish');
			updateBody();
		}
	});

	let body = [];
	let languagesArr = [];
	const guideId = props.guideId;

	for (let i = 0; i < filepath.length; i++) {
		let mergeData = {
			...filepath[i],
			...language[i],
			...codeBlock[i],
			...content[i],
		};
		languagesArr.push(language[i].language);
		body.push(mergeData);
	}

	const updateBody = async () => {
		const guideRef = doc(db, 'guides', guideId);
		await updateDoc(guideRef, {
			body,
			languages: languagesArr,
		});
	};


	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignContent: 'center',
				justifyContent: 'center',
				color: 'white',
			}}
		>
			<div className="flexbox">
				<Card
					sx={{
						background: '#2f2f2f',
						ml: 2,
						mb: 1,
						border: 1.25,
						borderColor: '#353540',
					}}
				>
					<IconButton
						sx={{ marginRight: '-8px' }}
						size="small"
						onClick={() => setAdd(true)}
					>
						<AddCircleOutlineIcon sx={{ color: '#468ef3' }} />
					</IconButton>

					<IconButton size="small" onClick={() => setRemove(true)}>
						<RemoveCircleOutlineIcon sx={{ color: 'gray' }} />
					</IconButton>
				</Card>
			</div>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: '10px',
				}}
			>
				<Card
					sx={{
						background: '#2f2f2f',
						p: 1,
						pl: 2,
						pr: 2,
						width: '25%',
						minHeight: '10vh',
						textOverflow: 'ellipsis',
						border: 1.25,
						borderColor: '#353540',
						flexGrow: 1,
					}}
				>
					<File fileChild={(data) => setFile(data)} add={add} remove={remove} />
				</Card>

				<Card
					sx={{
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
					}}
				>
					<Language
						languageChild={(data) => setLanguage(data)}
						add={add}
						remove={remove}
					/>
				</Card>

				<Card
					sx={{
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
					}}
				>
					{' '}
					<CodeEditor
						codeChild={(data) => setCode(data)}
						add={add}
						remove={remove}
					/>
				</Card>
				<Card
					sx={{
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
					}}
				>
					<Content
						contentChild={(data) => setContent(data)}
						add={add}
						remove={remove}
					/>
				</Card>
			</Box>
			<div>
				{body.map((obj, index) => {
					let languageUpper = obj.language;
					if (languageUpper.length === 3 || languageUpper === 'sass')
						languageUpper = languageUpper.toUpperCase();
					if (languageUpper.length >= 4 && languageUpper !== 'sass') {
						languageUpper =
							languageUpper[0].toUpperCase() + languageUpper.substring(1);
					}

					return (
						<details key={index}>
							<summary>
								{obj.filepath ? `${obj.filepath} Preview` : 'File Preview'}
							</summary>

							<div className="flexbox">
								<div>
									CodeBlock :{languageUpper ? languageUpper : 'Select Language'}
									<CodeMirror language={obj.language} value={obj.codeBlock} />
								</div>
								<div>
									Reference
									<ReactMarkdown>{obj.content}</ReactMarkdown>
								</div>
							</div>
						</details>
					);
				})}
			</div>
		</Container>
	);
}
