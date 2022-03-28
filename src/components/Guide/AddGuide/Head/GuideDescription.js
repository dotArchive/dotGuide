import React, { useState, useEffect } from 'react';

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
			<textarea
				placeholder="Guide Description"
				name="description"
				type="text"
				id="description"
				value={content}
				onChange={handleContentChange}
			/>
		</div>
	);
}
