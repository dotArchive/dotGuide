import React, { useState } from 'react';
import '@github/markdown-toolbar-element';
import ReactMarkdown from 'react-markdown';

export default function Content() {
	const [content, setContent] = useState('');

	const handleContentChange = (e) => {
		const { value } = e.target;
		setContent(value);
	};

	return (
		<details open>
			<summary></summary>
			<markdown-toolbar for="referenceContent">
				<md-bold>
					<button>bold</button>
				</md-bold>
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
			</markdown-toolbar>
			<textarea
				onChange={handleContentChange}
				id="referenceContent"
				cols="60"
				rows="15"
				name="referenceContent"
			></textarea>
			<details>
				<summary>Preview</summary>
				<ReactMarkdown>{content}</ReactMarkdown>
			</details>
		</details>
	);
}
