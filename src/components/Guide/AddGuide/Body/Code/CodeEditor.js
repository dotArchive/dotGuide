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

export default function CodeEditor(props) {
	const [codeBlock, setCodeBlock] = useState([{ codeBlock: '' }]);

	useEffect(() => {
		if (props.add === true) setCodeBlock([...codeBlock, { codeBlock: '' }]);
	});

	useEffect(() => {
		if (props.remove === true) codeBlock.pop();
	});

	useEffect(() => {
		props.codeChild(codeBlock);
	}, [codeBlock]);

	const handleCodeChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...codeBlock];
		list[index][name] = value;
		setCodeBlock(list);
	};

	const singleGuideTagCards = {
		background: '#2f2f2f',
		p: 1,
		pl: 2,
		pr: 2,
		mr: 1,
		mt: 1,
		width: '25%',
		minHeight: '10vh',
		textOverflow: 'ellipsis',
		border: 1.25,
		borderColor: '#353540',
	};
	return (
		<div>
			{codeBlock.map((singleCode, index) => (
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
						name="codeBlock"
						type="text"
						id="codeBlock"
						variant="outlined"
						size="small"
						label="Code Block"
						value={singleCode.codeBlock}
						onChange={(e) => handleCodeChange(e, index)}
					/>
				</div>
			))}
		</div>
	);
}
