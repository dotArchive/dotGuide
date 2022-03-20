import { useState } from 'react';

function Guide() {
	const [guideList, setGuideList] = useState([{ guide: '' }]);

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
		<form className="guideForm" autoComplete="off">
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
								<textarea
									name="text"
									rows="20"
									cols="50"
									placeholder="Guide Text Here..."
								></textarea>
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
