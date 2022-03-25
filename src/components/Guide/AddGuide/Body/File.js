import { useEffect, useState } from 'react';
import CodeEditor from './Code/CodeEditor';
import Language from './Code/Language';
import Reference from './Reference/Reference';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../../../firebase';

function File(props) {
	// const updateTitle = async () => {
	// 	const washingtonRef = doc(db, 'Guide', documentID);

	// 	await updateDoc(washingtonRef, {
	// 		body: newBodyList,
	// 	});
	// };

	// const myDoc = async () => {
	// 	const mydocRef = await addDoc(collection(db, 'File'), {
	// 		newBodyList,
	// 	});
	// 	setDocID(mydocRef.id);
	// 	return mydocRef;
	// };
	// useEffect(() => {}, []);

	// const myDoc = async () => {
	// 	newFileList.map((singleNewFile) => {
	// 		const mydocRef = addDoc(collection(db, 'File'), {
	// 			singleNewFile,
	// 		});
	// 		setDocID(mydocRef.id);
	// 		return mydocRef;
	// 	});
	// };

	// useEffect(() => {
	// 	if (newFileList !== '') updateTitle();
	// }, [newFileList]);

	// const [language, setLanguage] = useState([{}]);

	/////////////////////////////
	// Hooks & Variables
	const [fileList, setFileList] = useState([{ filepath: '' }]);

	let guideId = props.guideId;

	// Update Guide Doc with File Name

	const updateFileName = async () => {
		const guideRef = doc(db, 'Guide', guideId);
		await updateDoc(guideRef, {
			fileList,
		});
	};

	// Handle Changes & Buttons

	const handleFileChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...fileList];
		list[index][name] = value;

		setFileList(list);

		updateFileName();
	};

	const handleFileRemove = (index) => {
		const list = [...fileList];
		list.splice(index, 1);
		setFileList(list);
	};

	const handleFileAdd = () => {
		setFileList([...fileList, { filepath: '' }]);
	};

	return (
		<div className="form-field">
			{fileList.map((singleFile, index) => (
				<details key={index} open>
					<summary>
						<input
							placeholder="File Path"
							name="filepath"
							type="text"
							id="filepath"
							value={singleFile.filepath}
							onChange={(e) => handleFileChange(e, index)}
							required
						/>
						{fileList.length !== 1 && (
							<button
								type="button"
								onClick={() => handleFileRemove(index)}
								className="remove-btn"
							>
								<span>Remove</span>
							</button>
						)}
					</summary>

					{/* <Language guideId={guideId} fileList={fileList}> */}
					<CodeEditor />
					{/* </Language> */}
					<Reference />
				</details>
			))}
			<button type="button" onClick={handleFileAdd} className="add-btn">
				<span>Add File</span>
			</button>
		</div>
	);
}

export default File;
