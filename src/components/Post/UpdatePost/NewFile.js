import { useState } from 'react';
import CodeEditor from './PostCode/CodeEditor';
import Language from './PostCode/Language';
import Guide from './PostGuide/Guide';

function NewFile() {
	const [newFileList, setNewFileList] = useState([{ newFile: '' }]);

	const handleNewFileChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...newFileList];
		list[index][name] = value;
		setNewFileList(list);
	};

	const handleNewFileRemove = (index) => {
		const list = [...newFileList];
		list.splice(index, 1);
		setNewFileList(list);
	};

	const handleNewFileAdd = () => {
		setNewFileList([...newFileList, { newFile: '' }]);
	};

	return (
		<div style={{ border: '1rem solid green' }} className="form-field">
			{newFileList.map((singlenewFile, index) => (
				<div key={index} className="newFile">
					<div className="addNewFile">
						<div style={{ backgroundColor: '#263238' }}>
							<input
								placeholder="File Name"
								name="newFile"
								type="text"
								id="newFile"
								value={singlenewFile.newFile}
								onChange={(e) => handleNewFileChange(e, index)}
								required
							/>
							<Language>
								<CodeEditor />
							</Language>
						</div>
						<Guide />

						{newFileList.length - 1 === index && (
							<button
								type="button"
								onClick={handleNewFileAdd}
								className="add-btn"
							>
								<span>Add</span>
							</button>
						)}
					</div>

					<div className="removeNewFile">
						{newFileList.length !== 1 && (
							<button
								type="button"
								onClick={() => handleNewFileRemove(index)}
								className="remove-btn"
							>
								<span>Remove</span>
							</button>
						)}
					</div>
					<div></div>
				</div>
			))}
		</div>
	);
}

export default NewFile;
