import { useEffect, useState } from 'react';

export default function File(props) {
	const [fileList, setFileList] = useState([{ filepath: '' }]);

	useEffect(() => {
		if (props.add === true) setFileList([...fileList, { filepath: '' }]);
	});

	useEffect(() => {
		if (props.remove === true) fileList.pop();
	});

	useEffect(() => {
		props.fileChild(fileList);
	}, [fileList]);

	const handleFileChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...fileList];
		list[index][name] = value;
		setFileList(list);
	};

	// const handleFileRemove = (index) => {
	// 	const list = [...fileList];
	// 	list.splice(index, 1);
	// 	setFileList(list);
	// };

	// const handleFileAdd = () => {
	// 	setFileList([...fileList, { filepath: '' }]);
	// };
	return (
		<div className="form-field">
			{/* <button type="button" onClick={handleFileAdd} className="add-btn">
				<span>Add File</span>
			</button> */}
			{fileList.map((singleFile, index) => (
				<div key={index}>
					<input
						className="filePath"
						placeholder="File Path"
						name="filepath"
						type="text"
						id="filepath"
						value={singleFile.filepath}
						onChange={(e) => handleFileChange(e, index)}
						required
					/>
					{/* {fileList.length !== 1 && (
						<button
							type="button"
							onClick={() => handleFileRemove(index)}
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
