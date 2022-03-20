import { useState } from 'react';
import CodeMirror from './CodeMirror';

function Guide() {
	const [guideList, setGuideList] = useState([{ guide: '' }]);
	const [textArea, setTextArea] = useState('');

	const handleGuideChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...guideList];
		list[index][name] = value;
		setGuideList(list);
	};

	const handleGuideRemove = (index) => {
		const list = [...guideList];
		list.splice(index, 1);
		setGuideList(list);
	};

	const handleGuideAdd = () => {
		setGuideList([...guideList, { guide: '' }]);
	};

	return (
		<form
			style={{ backgroundColor: 'white' }}
			className="guideForm"
			autoComplete="off"
		>
			<div className="form-field">
				{guideList.map((singleGuide, index) => (
					<div key={index} className="guides">
						<div className="addGuide">
							<input
								placeholder="Guide Header"
								name="guide"
								type="text"
								id="guide"
								value={singleGuide.guide}
								onChange={(e) => handleGuideChange(e, index)}
								required
							/>
							{guideList.length - 1 === index && (
								<button
									type="button"
									onClick={handleGuideAdd}
									className="add-btn"
								>
									<span>Add</span>
								</button>
							)}
							<div>
								<CodeMirror
									language={'markdown'}
									value={textArea}
									onChange={setTextArea}
								/>
							</div>
						</div>

						<div className="removeGuide">
							{guideList.length !== 1 && (
								<button
									type="button"
									onClick={() => handleGuideRemove(index)}
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

export default Guide;
