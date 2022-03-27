import React, { useState, useContext, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Language from './Language';

const LanguageGet = React.createContext();
const LanguageUpdate = React.createContext();

export function useLanguage() {
	return useContext(LanguageGet);
}

export function useLanguageUpdate(props) {
	return useContext(LanguageUpdate);
}
export default function LanguageDropdown(props) {
	const [language, setLanguage] = useState('javascript');

	const handleLanguageChange = (e) => {
		const { value } = e.target;
		setLanguage(value);
	};

	return (
		<div>
			{/* <LanguageGet.Provider value={language}> */}
			{/* <LanguageUpdate.Provider value={handleLanguageChange}> */}
			<select
				onChange={(e) => handleLanguageChange(e)}
				name="language"
				id="language"
			>
				<option />
				<option value="javascript">JavaScript</option>
				<option value="jsx">JSX</option>
				<option value="xml">XML/HTML</option>
				<option value="css">CSS</option>
				<option value="markdown">Markdown</option>
				<option value="cobol">Cobol</option>
				<option value="django">Django</option>
				<option value="haskell">Haskell</option>
				<option value="pascal">Pascal</option>
				<option value="php">PHP</option>
				<option value="python">Python</option>
				<option value="powershell">Powershell</option>
				<option value="ruby">Ruby</option>
				<option value="rust">Rust</option>
				<option value="sass">SASS</option>
				<option value="swift">Swift</option>
			</select>
			{/* {props.children} */}
			<CodeEditor language={language} />
			{/* <Language language={language} /> */}
			{/* </LanguageUpdate.Provider> */}
			{/*  </LanguageGet.Provider> */}
		</div>
	);
}
