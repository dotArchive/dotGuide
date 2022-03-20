import React from 'react';

/****CODEMIRROR****/
import { Controlled } from 'react-codemirror2-react-17';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/search/search';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
// Languages
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/cobol/cobol';
import 'codemirror/mode/django/django';
import 'codemirror/mode/haskell/haskell';
import 'codemirror/mode/pascal/pascal';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python';
import 'codemirror/mode/powershell/powershell';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/swift/swift';

export default function CodeMirror(props) {
	const { language, displayName, value, onChange } = props;

	function handleChange(editor, data, value) {
		onChange(value);
	}

	return (
		<div className="editor-container">
			<div>{displayName}</div>

			<Controlled
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
