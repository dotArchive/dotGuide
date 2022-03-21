import React, { useState } from 'react';
import '@github/markdown-toolbar-element';
import ReactMarkdown from 'react-markdown';

export default function SingleGuide() {
	const [content, setContent] = useState('');

	const handleContentChange = (e) => {
		const { value } = e.target;
		setContent(value);
	};

	return (
		<div>
			<details open>
				<summary>Header</summary>
				<markdown-toolbar for="textarea_id">
					<button>
						<md-bold>bold</md-bold>
					</button>
					<button>
						<md-header>header</md-header>
					</button>
					<button>
						<md-italic>italic</md-italic>
					</button>
					<button>
						<md-quote>quote</md-quote>
					</button>
					<button>
						<md-code>code</md-code>
					</button>
					<button>
						<md-link>link</md-link>
					</button>
					<button>
						<md-image>image</md-image>
					</button>
					<button>
						<md-unordered-list>unordered-list</md-unordered-list>
					</button>
					<button>
						<md-ordered-list>ordered-list</md-ordered-list>
					</button>
					<button>
						<md-task-list>task-list</md-task-list>
					</button>
					<button>
						<md-mention>mention</md-mention>
					</button>
					<button>
						<md-ref>ref</md-ref>
					</button>
					<button data-md-button>Custom button</button>
				</markdown-toolbar>
				<textarea onChange={handleContentChange} id="textarea_id"></textarea>
			</details>
			<details>
				<summary>Preview</summary>
				<ReactMarkdown>{content}</ReactMarkdown>
			</details>

			<textarea required></textarea>
		</div>
	);
}
