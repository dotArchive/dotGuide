import { useEffect, useState } from 'react';

export default function Title(props) {
	const [title, setTitle] = useState('');

	const handleTitleChange = (e) => {
		const { value } = e.target;
		setTitle(value);
	};

	useEffect(() => {
		props.titleChild(title);
	}, [title]);

	return (
		<div className="title">
			<input
				onChange={handleTitleChange}
				placeholder="Title"
				name="title"
				type="text"
				id="title"
				required
			/>
		</div>
	);
}
