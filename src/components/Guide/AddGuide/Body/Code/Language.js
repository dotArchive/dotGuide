import React, { useState, useContext, useEffect } from 'react';

import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../../../../firebase';

const LanguageGet = React.createContext();
const LanguageUpdate = React.createContext();

export function useLanguage() {
	return useContext(LanguageGet);
}

export function useLanguageUpdate() {
	return useContext(LanguageUpdate);
}

export default function Language(props) {
	const [language, setLanguage] = useState('javascript');

	const [languages, setLanguages] = useState([{ language: '' }]);

	let guideId = props.guideId;

	const updateLanguage = async () => {
		const guideRef = doc(db, 'Guide', guideId);
		await updateDoc(guideRef, {
			languages,
		});
	};

	const handleLanguageChange = (e, index) => {
		const { name, value } = e.target;
		setLanguage(value);

		const list = [...languages];
		list[index][name] = value;
		setLanguages(list);

		updateLanguage();
	};
	console.log(languages);

	useEffect(() => {
		props.languageChild(languages);
	}, [languages]);

	// const handleLanguageAdd = () => {
	// 	setLanguages([...languages, { language: '' }]);
	// };

	return (
		<LanguageGet.Provider value={language}>
			<LanguageUpdate.Provider value={handleLanguageChange}>
				<div style={{ backgroundColor: '#263238' }}>
					{languages.map((singleLanguage, index) => (
						<input
							key={index}
							placeholder="Language"
							name="language"
							type="text"
							id="Language"
							value={singleLanguage.language}
							onChange={(e) => handleLanguageChange(e, index)}
						/>
					))}
					<select
						onChange={(e) => handleLanguageChange(e)}
						name="language"
						id="language"
					>
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
				</div>
				{props.children}
			</LanguageUpdate.Provider>
		</LanguageGet.Provider>
	);
}
