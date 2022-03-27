import React, { useState, useContext, useEffect } from 'react';

// const LanguageGet = React.createContext();
// const LanguageUpdate = React.createContext();

// export function useLanguage() {
// 	return useContext(LanguageGet);
// }

// export function useLanguageUpdate() {
// 	return useContext(LanguageUpdate);
// }

export default function Language(props) {
	const [language, setLanguage] = useState([{ language: '' }]);
	useEffect(() => {
		if (props.add === true) setLanguage([...language, { language: '' }]);
	});

	useEffect(() => {
		if (props.remove === true) language.pop();
	});

	useEffect(() => {
		if (props.languageChild && props.languageGrandChild) {
			props.languageChild(language);
			props.languageGrandChild(language);
		}
	}, [language]);

	const handleLanguageChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...language];
		list[index][name] = value;
		setLanguage(list);
	};

	const handleLanguageRemove = (index) => {
		const list = [...language];
		list.splice(index, 1);
		setLanguage(list);
	};

	const handleLanguageAdd = () => {
		setLanguage([...language, { language: '' }]);
	};

	return (
		<div>
			{/* <button type="button" onClick={handleLanguageAdd} className="add-btn">
				Add
			</button> */}
			{language.map((singleLanguage, index) => (
				<div key={index}>
					<select
						onChange={(e) => handleLanguageChange(e, index)}
						name="language"
						id="language"
						value={singleLanguage.language}
					>
						<option value="">Select Language</option>
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

					{/* {language.length !== 1 && (
						<button
							type="button"
							onClick={() => handleLanguageRemove(index)}
							className="remove-btn"
						>
							<span>Remove</span>
						</button>
					)} */}
				</div>
			))}
		</div>
	);
}
