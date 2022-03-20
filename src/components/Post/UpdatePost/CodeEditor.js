import React from 'react';

/****CODEMIRROR****/
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/search/search';
import { Controlled as ControlledEditor } from 'react-codemirror2-react-17';

export default function CodeEditor(props) {
	const { language, displayName, value, onChange } = props;

	function handleChange(editor, data, value) {
		onChange(value);
	}

	return (
		<div className="editor-container">
			<div style={{ backgroundColor: 'green' }}>{displayName}</div>

			<ControlledEditor
				onBeforeChange={handleChange}
				value={value}
				className="code-mirror-wrapper"
				options={{
					lineWrapping: true,
					lint: true,
					mode: language,
					theme: 'material',
					lineNumbers: true,
					smartIndent: true,
					autoCloseBrackets: true,
					matchBrackets: true,
					search: true,
					// readOnly: true,
				}}
			/>
		</div>
	);
}
