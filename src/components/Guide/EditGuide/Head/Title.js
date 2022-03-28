import { useEffect, useState } from 'react';

export default function Title(props) {
	const [title, setTitle] = useState('');

	useEffect(() => {
		setTitle(props.guide.title);
	}, [props.guide.userId]);

	useEffect(() => {
		props.titleChild(title);
	}, [title]);

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
				id="title"
				required
			/>
		</div>
	);
}
