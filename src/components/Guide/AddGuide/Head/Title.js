import { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';

export default function Title(props) {
	const [title, setTitle] = useState('');

	useEffect(() => {
		props.titleChild(title);
	}, [title]);

	const handleTitleChange = (e) => {
		const { value } = e.target;
		setTitle(value);
	};
	const filePathTextField = {
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'white',
				borderRadius: 3,
				mt: 0.5,
				mb: 0.5,
			},
		},
	};

	return (
		<div>
			<TextField
				className="textField"
				sx={filePathTextField}
				name="title"
				onChange={handleTitleChange}
				id="title"
				variant="outlined"
				label="Guide Title"
				size="small"
				fullWidth
				required
			/>
		</div>
	);
}
