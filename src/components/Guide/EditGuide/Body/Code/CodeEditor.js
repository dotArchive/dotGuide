import { useEffect, useState } from 'react';

export default function CodeEditor(props) {
	const [codeBlock, setCodeBlock] = useState([{ codeBlock: '' }]);

	useEffect(() => {
		if (props.guide.bodyRef) {
			let editCodeBlock = props.guide.bodyRef.codeBlock.map(
				(singleCodeBlock) => {
					return singleCodeBlock;
				}
			);
			setCodeBlock([...editCodeBlock, { codeBlock: '' }]);
		}
	}, [props.guide.userId]);

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

	return (
		<div>
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
				</div>
			))}
		</div>
	);
}
