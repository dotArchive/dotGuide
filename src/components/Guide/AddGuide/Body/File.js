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

export default function File(props) {
	const [fileList, setFileList] = useState([{ filepath: '' }]);

	useEffect(() => {
		if (props.add === true) setFileList([...fileList, { filepath: '' }]);
	});

	useEffect(() => {
		if (props.remove === true) fileList.pop();
	});

	useEffect(() => {
		props.fileChild(fileList);
	}, [fileList]);

	const handleFileChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...fileList];
		list[index][name] = value;
		setFileList(list);
	};

	return (
		<div>
			{fileList.map((singleFile, index) => (
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
						// className="filePath"
						name="filepath"
						type="text"
						id="filepath"
						variant="outlined"
						size="small"
						label="File Path"
						value={singleFile.filepath}
						onChange={(e) => handleFileChange(e, index)}
					/>
				</div>
			))}
		</div>
	);
}
