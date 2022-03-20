import { useState } from 'react';
import CodeEditor from './CodeEditor/CodeEditor';
import Language from './CodeEditor/Language';
import Guide from './Guide';

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
		<form className="newFileForm" autoComplete="off">
			NewFiles:
			<div className="form-field">
				{newFileList.map((singlenewFile, index) => (
					<div key={index} className="newFile">
						<div className="addNewFile">
							<input
								placeholder="New File"
								name="newFile"
								type="text"
								id="newFile"
								value={singlenewFile.newFile}
								onChange={(e) => handleNewFileChange(e, index)}
								required
							/>
							<Language />
							<CodeEditor />
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
					</div>
				))}
			</div>
		</form>
	);
}

export default NewFile;
