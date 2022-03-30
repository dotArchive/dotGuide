import TextareaAutosize from '@mui/base/TextareaAutosize';
import React, { useState, useEffect } from 'react';
import {
	Typography,
	Box,
	IconButton,
	Button,
	Card,
	Container,
	TextField,
	InputAdornment,
} from '@mui/material';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import Visibility from '@mui/icons-material/Visibility';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ClassNames } from '@emotion/react';

export default function Content(props) {
	const [contentList, setContentList] = useState([{ content: '' }]);

	useEffect(() => {
		if (props.add === true) setContentList([...contentList, { content: '' }]);
	});

	useEffect(() => {
		if (props.remove === true) contentList.pop();
	});

	useEffect(() => {
		props.contentChild(contentList);
	}, [contentList]);

	const handleContentChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...contentList];
		list[index][name] = value;
		setContentList(list);
	};

	return (
		<div>
			<Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
				Reference
			</Typography>
			{contentList.map((singleContent, index) => (
				<div key={index}>
					<Typography
						sx={{
							color: 'white',
							fontSize: '0.7em',
							minHeight: 18,
							p: 0.5,
							mt: 0.5,
							mb: 0.5,
							border: 1,
							borderColor: 'transparent',
							borderRadius: 3,
							textAlign: 'center',
							textOverflow: 'ellipsis',
							display: 'flex',
							flexWrap: 'wrap',
						}}
					>
						<TextareaAutosize
							className="textArea"
							name="content"
							id="content"
							placeholder="Reference"
							value={singleContent.content}
							onChange={(e) => handleContentChange(e, index)}
						/>
					</Typography>
				</div>
			))}
		</div>
	);
}
