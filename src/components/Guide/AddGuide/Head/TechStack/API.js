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

function API(props) {
	const [APIList, setAPIList] = useState([{ API: '' }]);

	useEffect(() => {
		props.apiChild(APIList);
	}, [APIList]);

	const handleAPIChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...APIList];
		list[index][name] = value;
		setAPIList(list);
	};

	const handleAPIRemove = (index) => {
		const list = [...APIList];
		list.splice(index, 1);
		setAPIList(list);
	};

	const handleAPIAdd = () => {
		setAPIList([...APIList, { API: '' }]);
	};

	return (
		<div className="form-field">
			<div className="flexbox" style={{ paddingRight: '2rem' }}>
				<IconButton
					sx={{ paddingLeft: '2.5px' }}
					size="small"
					onClick={handleAPIAdd}
				>
					<AddCircleOutlineIcon sx={{ color: '#468ef3' }} />
				</IconButton>

				<Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
					API
				</Typography>
			</div>

			{APIList.map((singleAPI, index) => (
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
					color="warning"
					name="language"
					id="language"
					onChange={(e) => handleAPIChange(e, index)}
					variant="outlined"
					value={singleAPI.APIList}
					size="small"
					InputProps={{
						startAdornment: (
							<InputAdornment style={{ marginLeft: '-15px' }} position="start">
								<IconButton size="small" onClick={() => handleAPIRemove(index)}>
									<RemoveCircleOutlineIcon sx={{ color: 'gray' }} />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			))}
		</div>
	);
}

export default API;
