import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

export default function GuideDescription() {
	const [content, setContent] = useState('');

	const handleContentChange = (e) => {
		setContent(e);
	};

	const options = useMemo(() => {
		return {
			toolbar: [
				'bold',
				'italic',
				'heading',
				'|',
				'quote',
				'unordered-list',
				'ordered-list',
				'|',
				'link',
				'image',
				'|',
				'guide',
			],
			autofocus: true,
			onToggleFullScreen: false,
			placeholder: 'Guide Description Here...',
		};
	}, []);

	return (
		<div>
			<details open>
				<summary>Description</summary>
				<SimpleMDE
					options={options}
					value={content}
					onChange={handleContentChange}
				/>
			</details>
			<details>
				<summary>Description Preview</summary>
				<ReactMarkdown>{content}</ReactMarkdown>
			</details>
		</div>
	);
}
