import { useEffect, useState } from 'react';

export default function CodeEditor(props) {
	const [codeBlock, setCodeBlock] = useState([{ codeBlock: '' }]);

	useEffect(() => {
		if (props.add === true) setCodeBlock([...codeBlock, { codeBlock: '' }]);
	});

	useEffect(() => {
		if (props.remove === true) codeBlock.pop();
	});

	useEffect(() => {
		props.codeChild(codeBlock);
	}, [codeBlock]);

	const handleCodeChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...codeBlock];
		list[index][name] = value;
		setCodeBlock(list);
	};

	// const handleCodeRemove = (index) => {
	// 	const list = [...codeBlock];
	// 	list.splice(index, 1);
	// 	setCodeBlock(list);
	// };

	// const handleCodeAdd = () => {
	// 	setCodeBlock([...codeBlock, { codeBlock: '' }]);
	// };

	return (
		<div>
			{/* <button type="button" onClick={handleCodeAdd} className="add-btn">
				<span>Add Code Block</span>
			</button> */}
			{codeBlock.map((singleCode, index) => (
				<div key={index}>
					<textarea
						className="textArea"
						placeholder="Code Block"
						name="codeBlock"
						type="text"
						id="codeBlock"
						rows="1"
						value={singleCode.codeBlock}
						onChange={(e) => handleCodeChange(e, index)}
						required
					/>
					{/* {codeBlock.length !== 1 && (
						<button
							type="button"
							onClick={() => handleCodeRemove(index)}
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
