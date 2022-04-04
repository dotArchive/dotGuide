import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

export default function Title(props) {
	const [title, setTitle] = useState('Title*');

	useEffect(() => {
		if (props.guide.head) {
			setTitle(props.guide.head.title.toUpperCase());
		}
	}, [props.guide.userId]);

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
		<TextField
			className="textField"
			sx={filePathTextField}
			variant="outlined"
			label="Guide Title"
			size="small"
			onChange={handleTitleChange}
			value={title}
			name="title"
			type="text"
			id="title"
			required
			fullWidth
		/>
	);
}
