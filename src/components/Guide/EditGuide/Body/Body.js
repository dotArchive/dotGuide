import { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import ReactMarkdown from 'react-markdown';

// Components
import Language from './Code/Language';
import CodeEditor from './Code/CodeEditor';
import CodeMirror from './Code/CodeMirror';
import Content from './Reference/Content';
import File from './File';

// MUI
import {
	Typography,
	Box,
	IconButton,
	Card,
	Container,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Body(props) {
	const [filepath, setFile] = useState([]);
	const [language, setLanguage] = useState([]);
	const [codeBlock, setCode] = useState([]);
	const [content, setContent] = useState([]);
	const [add, setAdd] = useState(false);
	const [remove, setRemove] = useState(false);
	const [fileView, setFileView] = useState(0);

	useEffect(() => {
		setAdd(false);
	}, [add]);

	useEffect(() => {
		setRemove(false);
	}, [remove]);

	useEffect(() => {
		if (props.save === true) {
			updateBody();
		}
	});

	useEffect(() => {
		if (props.submit === true) {
			updateBody();
		}
	});

	let body = [];
	const guideId = props.guideId;

	for (let i = 0; i < filepath.length; i++) {
		let mergeData = {
			...filepath[i],
			...language[i],
			...codeBlock[i],
			...content[i],
		};
		body.push(mergeData);
	}

	const updateBody = async () => {
		const guideRef = doc(db, 'guides', guideId);
		await updateDoc(guideRef, {
			bodyRef: {
				codeBlock,
				filepath,
				content,
				language,
			},
			body,
			languages: language,
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
					<File
						guide={props.guide}
						fileChild={(data) => setFile(data)}
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
						width: '25%',
						minHeight: '10vh',
						textOverflow: 'ellipsis',
						border: 1.25,
						borderColor: '#353540',
						flexGrow: 1,
					}}
				>
					<Language
						guide={props.guide}
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
						width: '25%',
						minHeight: '10vh',
						textOverflow: 'ellipsis',
						border: 1.25,
						borderColor: '#353540',
						flexGrow: 1,
					}}
				>
					<CodeEditor
						guide={props.guide}
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
						width: '25%',
						minHeight: '10vh',
						textOverflow: 'ellipsis',
						border: 1.25,
						borderColor: '#353540',
						flexGrow: 1,
					}}
				>
					<Content
						guide={props.guide}
						contentChild={(data) => setContent(data)}
						add={add}
						remove={remove}
					/>
				</Card>
			</Box>

			<div className="file Preview">
				<Card
					sx={{
						background: '#2f2f2f',
						mt: 1,
						pb: 1,
						pt: 1,
						pl: 1,
						pr: 1,
						border: 1.25,
						borderColor: '#353540',
					}}
				>
					<FormControl
						fullWidth
						label="Language"
						size="small"
						sx={{
							py: 0.5,
							mt: 0.5,
							color: 'white',
							'& .Mui-focused .MuiOutlinedInput-notchedOutline': {
								borderRadius: 3,
							},
							'& label.Mui-focused': {},
							'& label': {
								color: 'white',
							},
							'&:hover label': {
								color: '#f57c00',
							},
							'& .MuiInputBase-input': {
								color: 'white',
								py: 0.5,
							},
							'& .MuiOutlinedInput-root': {
								'&:hover fieldset': {
									borderRadius: 3,
								},
								'&:focus fieldset': {
									borderRadius: 3,
								},
								'& fieldset': {
									borderColor: 'white',
									borderRadius: 3,
								},
								'&:focus .MuiInputLabel-root': {
									borderColor: '#f57c00',
									borderRadius: 3,
								},
							},
						}}
					>
						<InputLabel>File Path</InputLabel>
						<Select
							MenuProps={{
								PaperProps: {
									sx: {
										bgcolor: '#303035',
										color: 'white',
									},
								},
							}}
							size="small"
							label={'File Path'}
							id="language"
							onChange={(e) => setFileView(e.target.value)}
							value={fileView}
						>
							{body.map((file, idx) => (
								<MenuItem
									key={idx}
									disableGutters={true}
									dense={true}
									sx={{
										py: 0,
										pl: 1,
										backgroundColor: '#cccccc55',
										fontSize: '1em',
										color: 'white',
									}}
									value={idx}
								>
									{file.filepath}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Card>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '49%',
							mx: 0.5,
						}}
					>
						<Card
							sx={{
								background: '#2f2f2f',
								p: 1,
								pl: 2,
								mt: 1,
								overflow: 'auto',
								height: '450px',
								border: 1.25,
								borderColor: '#353540',
								color: 'white',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
								}}
							>
								<Typography sx={{ color: 'white', fontSize: '0.75em' }}>
									{body[fileView] ? body[fileView].filepath : ''}
								</Typography>
								<Box sx={{ ml: 2 }}>
									<Typography sx={{ color: 'white', fontSize: '0.75em' }}>
										{body[fileView]
											? body[fileView].language.toUpperCase()
											: ''}
									</Typography>
								</Box>
							</Box>
							<CodeMirror
								language={body[fileView] ? body[fileView].language : ''}
								value={body[fileView] ? body[fileView].codeBlock : ''}
							/>
						</Card>
					</Box>
					<Box sx={{ width: '51%', mx: 0.5 }}>
						<Card
							sx={{
								background: '#2f2f2f',
								p: 1,
								pl: 2,
								mt: 1,
								overflow: 'auto',
								height: '450px',
								border: 1.25,
								borderColor: '#353540',
								color: 'white',
							}}
						>
							<ReactMarkdown>
								{body[fileView] ? body[fileView].content : ''}
							</ReactMarkdown>
						</Card>
					</Box>
				</Box>
			</div>
		</Container>
	);
}
