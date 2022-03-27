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

	// const handleContentRemove = (index) => {
	// 	const list = [...contentList];
	// 	list.splice(index, 1);
	// 	setContentList(list);
	// };

	// const handleContentAdd = () => {
	// 	setContentList([...contentList, { content: '' }]);
	// };

	return (
		<div>
			{/* <button type="button" onClick={handleContentAdd} className="add-btn">
				<span>Add Reference</span>
			</button> */}
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
					{/* 
					{contentList.length !== 1 && (
						<button
							type="button"
							onClick={() => handleContentRemove(index)}
							className="remove-btn"
						>
							<span>Remove</span>
						</button>
					)} */}
				</div>
			))}
		</div>
	);
}

// const options = useMemo(() => {
// 	return {
// 		toolbar: [
// 			'bold',
// 			'italic',
// 			'heading',
// 			'|',
// 			'quote',
// 			'unordered-list',
// 			'ordered-list',
// 			'|',
// 			'link',
// 			'image',
// 			'|',
// 			'guide',
// 		],
// 		autofocus: true,
// 		onToggleFullScreen: false,
// 		placeholder: 'Reference Content Here...',
// 	};
// }, []);

/* <details>
				<summary>Reference Preview</summary>
				<ReactMarkdown>{content}</ReactMarkdown>
			</details> */

/* <SimpleMDE
						options={options}
						name="content"
						id="content"
						value={singleContent.content}
						onChange={(e) => handleContentChange(e, index)}
					/> */
