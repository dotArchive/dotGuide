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

function CodeURL(props) {
	const [codeURL, setcodeURL] = useState([{ URL: '' }]);

	useEffect(() => {
		props.urlChild(codeURL);
	}, [codeURL]);

	const handleURLChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...codeURL];
		list[index][name] = value;
		setcodeURL(list);
	};

	const handleURLRemove = (index) => {
		const list = [...codeURL];
		list.splice(index, 1);
		setcodeURL(list);
	};

	const handleURLAdd = () => {
		setcodeURL([...codeURL, { URL: '' }]);
	};

	return (
		<div className="form-field">
			<div className="flexbox" style={{ justifyContent: 'flex-end' }}>
				<IconButton
					sx={{ paddingLeft: '2.5px' }}
					size="small"
					onClick={handleURLAdd}
				>
					<AddCircleOutlineIcon sx={{ color: 'green' }} />
				</IconButton>

				{codeURL.map((singleURL, index) => (
					<div key={index} className="URL">
						<TextField
							key={index}
							sx={{
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderColor: 'white',
										borderRadius: 3,
										mt: 0.5,
										mb: 0.5,

										// fontSize: '0.7em',
									},
									'& adornedEnd': {
										pr: 0,
									},
								},
							}}
							color="warning"
							name="language"
							id="language"
							onChange={(e) => handleURLChange(e, index)}
							variant="outlined"
							value={singleURL.URL}
							size="small"
							InputProps={{
								startAdornment: (
									<InputAdornment
										style={{ marginLeft: '-15px' }}
										position="start"
									>
										<IconButton
											size="small"
											onClick={() => handleURLRemove(index)}
										>
											<RemoveCircleOutlineIcon sx={{ color: 'red' }} />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default CodeURL;
