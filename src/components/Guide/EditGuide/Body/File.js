import { useEffect, useState } from 'react';

export default function File(props) {
	const [fileList, setFileList] = useState([{ filepath: '' }]);
	useEffect(() => {
		if (props.guide.bodyRef) {
			let editFile = props.guide.bodyRef.filepath.map((singleFile) => {
				return singleFile;
			});
			setFileList([...editFile, { filepath: '' }]);
		}
	}, [props.guide.userId]);

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

	return (
		<div className="form-field">
			{fileList.map((singleFile, index) => (
				<div key={index}>
					<input
						placeholder="File Path"
						name="filepath"
						type="text"
						id="filepath"
						value={singleFile.filepath}
						onChange={(e) => handleFileChange(e, index)}
						required
					/>
				</div>
			))}
		</div>
	);
}
