import React from 'react';

/****CODEMIRROR****/
import { Controlled } from 'react-codemirror2-react-17';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/addon/search/search';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/mode/markdown/markdown';

export default function CodeMirror(props) {
	const { language, displayName, value, onChange } = props;

	function handleChange(editor, data, value) {
		onChange(value);
	}

	return (
		<div className="guide-container">
			<div style={{ backgroundColor: 'blue' }}>{displayName}</div>

			<Controlled
				onBeforeChange={handleChange}
				value={value}
				className="guide-mirror-wrapper"
				options={{
					lineWrapping: true,
					lint: true,
					mode: language,
					theme: 'duotone-light',
					smartIndent: true,
					autoCloseBrackets: true,
					search: true,
					// readOnly: true,
				}}
			/>
		</div>
	);
}
