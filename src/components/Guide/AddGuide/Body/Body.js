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
		if (props.save === true) updateBodyName();
	});

	useEffect(() => {
		if (props.submit === true) updateBodyName();
	});

	const guideId = props.guideId;
	let body = [];

	for (let i = 0; i < filepath.length; i++) {
		let mergeData = {
			...filepath[i],
			...language[i],
			...codeBlock[i],
			...content[i],
		};
		body.push(mergeData);
	}

	const updateBodyName = async () => {
		const guideRef = doc(db, 'Guide', guideId);
		await updateDoc(guideRef, {
			body,
		});
	};

	return (
		<div style={{ backgroundColor: 'green' }}>
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
					return (
						<details key={index}>
							<summary>
								{obj.filepath ? `${obj.filepath} Preview` : 'File Preview'}
							</summary>
							<div className="flexbox">
								<CodeMirror language={obj.language} value={obj.codeBlock} />
								<ReactMarkdown>{obj.content}</ReactMarkdown>
							</div>
						</details>
					);
				})}
			</div>

			{/* <button type="button" onClick={() => updateBodyName()}>
				Update FireStore
			</button> */}
		</div>
	);
}
