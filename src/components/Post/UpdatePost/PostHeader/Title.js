import { useState } from 'react';

export default function Title() {
	const [title, setTitle] = useState('');

	const handleTitleChange = (e) => {
		const { value } = e.target;
		setTitle(value);
	};

	return (
		<div className="title">
			<input
				onChange={handleTitleChange}
				placeholder="Title"
				name="title"
				type="text"
				id="guide"
				required
			/>
		</div>
	);
}
