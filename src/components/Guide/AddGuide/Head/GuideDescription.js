import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

export default function GuideDescription(props) {
	const [content, setContent] = useState('');

	useEffect(() => {
		props.descriptionChild(content);
	}, [content]);

	const handleContentChange = (e) => {
		const { value } = e.target;
		setContent(value);
	};

	return (
		<div>
			<TextField
				label="Guide Description"
				name="description"
				type="text"
				id="description"
				value={content}
				onChange={handleContentChange}
				sx={{
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: 'white',
							borderRadius: 3,
							mt: 0.5,
							mb: 0.5,
						},
					},
				}}
				variant="outlined"
				multiline
				fullWidth
			/>
		</div>
	);
}
