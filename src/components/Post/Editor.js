import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import { Controlled as ControlledEditor } from 'react-codemirror2-react-17';

export default function Editor(props) {
	const { language, displayName, value, onChange } = props;

	function handleChange(editor, data, value) {
		onChange(value);
	}

	return (
		<div className="editor-container">
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
					// readOnly: true,
				}}
			/>
		</div>
	);
}
