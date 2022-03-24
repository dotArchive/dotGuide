import React, { useEffect, useState } from 'react';
import CodeMirror from './CodeMirror';
import { useLanguage } from './Language';

export default function CodeEditor(props) {
	const language = useLanguage();

	const [code, setCode] = useState('');
	const [codes, setCodes] = useState([]);

	useEffect(() => {
		props.codeChild(code);
	}, [code]);

	return (
		<div>
			<CodeMirror language={language} value={code} onChange={setCode} />
		</div>
	);
}
