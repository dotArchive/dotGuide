import React, { useState, useMemo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import 'textarea-markdown';

export default function Content(props) {
	const [contentList, setContentList] = useState([{ content: '' }]);

	useEffect(() => {
		if (props.add === true) setContentList([...contentList, { content: '' }]);
	});

	useEffect(() => {
		if (props.remove === true) contentList.pop();
	});

	useEffect(() => {
		props.contentChild(contentList);
	}, [contentList]);

	const handleContentChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...contentList];
		list[index][name] = value;
		setContentList(list);
	};

	return (
		<div>
			{contentList.map((singleContent, index) => (
				<div key={index}>
					<textarea
						placeholder="Reference Content"
						name="content"
						type="text"
						id="content"
						rows="1"
						className="textArea"
						value={singleContent.content}
						onChange={(e) => handleContentChange(e, index)}
						required
					/>
				</div>
			))}
		</div>
	);
}
