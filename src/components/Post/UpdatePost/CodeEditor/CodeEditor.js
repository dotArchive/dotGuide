import { useState } from 'react';
import CodeMirror from './CodeMirror';
import Language from './Language';

export default function CodeEditor() {
	const [code, setCode] = useState('');
	// const language = 'javascript';

	return (
		<div>
			<CodeMirror language={<Language />} value={code} onChange={setCode} />
		</div>
	);
}
