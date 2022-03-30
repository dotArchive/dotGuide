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
			{contentList.map((singleContent, index) => (
				<div key={index}>
					<TextField
						sx={{
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: 'white',
									borderRadius: 3,
									mt: 0.5,
									mb: 0.5,
								},
								'& adornedEnd': {
									pr: 0,
								},
							},
						}}
						color="warning"
						name="content"
						type="text"
						id="content"
						rows="1"
						variant="outlined"
						size="small"
						className="textArea"
						label="Reference Content"
						value={singleContent.content}
						onChange={(e) => handleContentChange(e, index)}
					/>
				</div>
			))}
		</div>
	);
}
