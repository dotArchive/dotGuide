import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import Language from './Code/Language';
import CodeEditor from './Code/CodeEditor';
import CodeMirror from './Code/CodeMirror';
import Content from './Reference/Content';
import File from './File';

export default function Body(props) {
	const [filepath, setFile] = useState([]);
	const [language, setLanguages] = useState([]);
	const [codeBlock, setCode] = useState([]);
	const [content, setContent] = useState([]);
	const [add, setAdd] = useState(false);
	const [remove, setRemove] = useState(false);

	useEffect(() => {
		setAdd(false);
	}, [add]);

	useEffect(() => {
		setRemove(false);
	}, [remove]);

	useEffect(() => {
		if (props.save === true) {
			updateBody();
		}
	});

	useEffect(() => {
		if (props.submit === true) {
			updateBody();
		}
	});

	let body = [];
	const guideId = props.guideId;

	for (let i = 0; i < filepath.length; i++) {
		let mergeData = {
			...filepath[i],
			...language[i],
			...codeBlock[i],
			...content[i],
		};
		body.push(mergeData);
	}

	const updateBody = async () => {
		const guideRef = doc(db, 'Guide', guideId);
		await updateDoc(guideRef, {
			bodyRef: {
				codeBlock,
				filepath,
				content,
				language,
			},
			body,
		});
	};

	return (
		<div>
			<button type="button" onClick={() => setAdd(true)}>
				Add New File
			</button>
			<button type="button" onClick={() => setRemove(true)}>
				Remove Last File
			</button>
			<div className="flexbox">
				<File fileChild={(data) => setFile(data)} add={add} remove={remove} />
				<Language
					languageChild={(data) => setLanguages(data)}
					add={add}
					remove={remove}
				/>
				<CodeEditor
					codeChild={(data) => setCode(data)}
					add={add}
					remove={remove}
				/>
				<Content
					contentChild={(data) => setContent(data)}
					add={add}
					remove={remove}
				/>
			</div>
			<div>
				{body.map((obj, index) => {
					let languageUpper = obj.language;
					if (languageUpper.length === 3 || languageUpper === 'sass')
						languageUpper = languageUpper.toUpperCase();
					if (languageUpper.length >= 4 && languageUpper !== 'sass') {
						languageUpper =
							languageUpper[0].toUpperCase() + languageUpper.substring(1);
					}

					return (
						<details key={index}>
							<summary>
								{obj.filepath ? `${obj.filepath} Preview` : 'File Preview'}
							</summary>

							<div className="flexbox">
								<div>
									CodeBlock :{languageUpper ? languageUpper : 'Select Language'}
									<CodeMirror language={obj.language} value={obj.codeBlock} />
								</div>
								<div>
									Reference
									<ReactMarkdown>{obj.content}</ReactMarkdown>
								</div>
							</div>
						</details>
					);
				})}
			</div>
		</div>
	);
}
