import React, { useState, useEffect } from 'react';
import {
	Typography,
	IconButton,
	TextField,
	InputAdornment,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function CodeURL(props) {
	const [codeURL, setcodeURL] = useState(['']);

	useEffect(() => {
		props.urlChild(codeURL);
	}, [codeURL]);

	const handleURLChange = (e, index) => {
		const { value } = e.target;
		const list = [...codeURL];
		list[index] = value;
		setcodeURL(list);
	};

	const handleURLRemove = (index) => {
		const list = [...codeURL];
		list.splice(index, 1);
		setcodeURL(list);
	};

	const handleURLAdd = () => {
		setcodeURL([...codeURL, '']);
	};

	return (
		<div className="form-field">
			<div className="flexbox">
				<IconButton
					sx={{ paddingLeft: '2.5px' }}
					size="small"
					onClick={handleURLAdd}
				>
					<AddCircleOutlineIcon sx={{ color: '#468ef3' }} />
				</IconButton>
				<Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
					URLs
				</Typography>
			</div>
			<div className="flexbox" style={{ flexWrap: 'wrap' }}>
				{codeURL.map((singleURL, index) => (
					<div key={index}>
						<TextField
							key={index}
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
							name="language"
							id="language"
							onChange={(e) => handleURLChange(e, index)}
							variant="outlined"
							value={singleURL.codeURL}
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
											<RemoveCircleOutlineIcon sx={{ color: 'gray' }} />
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
