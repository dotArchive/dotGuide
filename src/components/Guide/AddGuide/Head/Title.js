import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

export default function Title(props) {
	const [title, setTitle] = useState('');

	useEffect(() => {
		props.titleChild(title);
	}, [title]);

	const handleTitleChange = (e) => {
		const { value } = e.target;
		setTitle(value);
	};

	return (
		<div className="title">
			<TextField
				color="warning"
				name="title"
				onChange={handleTitleChange}
				id="title"
				variant="standard"
				label="Title"
				required
			/>
			{/* <input
				onChange={handleTitleChange}
				placeholder="Title"
				name="title"
				type="text"
				id="title"
				required
			/> */}
		</div>
	);
}
