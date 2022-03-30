import React, { useState, useEffect } from 'react';
import {
	Typography,
	IconButton,
	TextField,
	InputAdornment,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Tag(props) {
	const [tagList, setTagList] = useState([{ tag: '' }]);

	useEffect(() => {
		props.tagChild(tagList);
	}, [tagList]);

	const handleTagChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...tagList];
		list[index][name] = value;
		setTagList(list);
	};

	const handleTagRemove = (index) => {
		const list = [...tagList];
		list.splice(index, 1);
		setTagList(list);
	};

	const handleTagAdd = () => {
		setTagList([...tagList, { tag: '' }]);
	};

	return (
		<div className="form-field">
			<div
				className="flexbox"
				style={{ paddingRight: '2rem', flexWrap: 'wrap' }}
			>
				<IconButton
					sx={{ paddingLeft: '2.5px' }}
					size="small"
					onClick={handleTagAdd}
				>
					<AddCircleOutlineIcon sx={{ color: '#468ef3' }} />
				</IconButton>
				<Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
					Tags
				</Typography>
			</div>
			<div className="flexbox" style={{ flexWrap: 'wrap' }}>
				{tagList.map((singletag, index) => (
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
							name="tag"
							id="tag"
							onChange={(e) => handleTagChange(e, index)}
							variant="outlined"
							value={singletag.tagList}
							size="small"
							InputProps={{
								startAdornment: (
									<InputAdornment
										style={{ marginLeft: '-15px' }}
										position="start"
									>
										<IconButton
											size="small"
											onClick={() => handleTagRemove(index)}
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

export default Tag;
