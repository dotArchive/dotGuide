import React, { useState, useEffect } from 'react';
import {
	Typography,
	IconButton,
	TextField,
	InputAdornment,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function BackEnd(props) {
	const [backEndList, setBackEndList] = useState([{ backEnd: '' }]);

	useEffect(() => {
		props.backEndChild(backEndList);
	}, [backEndList]);

	const handleBackEndChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...backEndList];
		list[index][name] = value;
		setBackEndList(list);
	};

	const handleBackEndRemove = (index) => {
		const list = [...backEndList];
		list.splice(index, 1);
		setBackEndList(list);
	};

	const handleBackEndAdd = () => {
		setBackEndList([...backEndList, { backEnd: '' }]);
	};

	return (
		<div className="form-field">
			<div className="flexbox" style={{ paddingRight: '2rem' }}>
				<IconButton
					sx={{ paddingLeft: '2.5px' }}
					size="small"
					onClick={handleBackEndAdd}
				>
					<AddCircleOutlineIcon sx={{ color: '#468ef3' }} />
				</IconButton>

				<Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
					Back End
				</Typography>
			</div>
			{backEndList.map((singlebackEnd, index) => (
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
					onChange={(e) => handleBackEndChange(e, index)}
					variant="outlined"
					value={singlebackEnd.backEndList}
					size="small"
					InputProps={{
						startAdornment: (
							<InputAdornment style={{ marginLeft: '-15px' }} position="start">
								<IconButton
									size="small"
									onClick={() => handleBackEndRemove(index)}
								>
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

export default BackEnd;
