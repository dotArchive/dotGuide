import React, { useState } from 'react';
import CodeMirror from './CodeMirror';
import { useLanguage, useLanguageUpdate } from './Language';

export default function CodeEditor() {
	const language = useLanguage();

	const [code, setCode] = useState('');

	return (
		<div>
			<CodeMirror language={language} value={code} onChange={setCode} />
		</div>
	);
}
