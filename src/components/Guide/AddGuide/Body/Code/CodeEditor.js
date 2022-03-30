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

	return (
		<div>
			<Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
				Code Block
			</Typography>
			{codeBlock.map((singleCode, index) => (
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
							name="codeBlock"
							id="codeBlock"
							placeholder="Code Block"
							value={singleCode.codeBlock}
							onChange={(e) => handleCodeChange(e, index)}
						/>
					</Typography>
				</div>
			))}
		</div>
	);
}
