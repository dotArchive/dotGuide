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
		<TextField
			className="textField"
			sx={{
				multilineColor: 'white',
			}}
			color="warning"
			name="title"
			onChange={handleTitleChange}
			id="title"
			variant="standard"
			placeholder="Title*"
			size="medium"
			required
		/>
	);
}
