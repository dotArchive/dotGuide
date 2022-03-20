import { useState } from 'react';

function FrontEnd() {
	const [frontEndList, setFrontEndList] = useState([{ frontEnd: '' }]);

	const handleFrontEndChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...frontEndList];
		list[index][name] = value;
		setFrontEndList(list);
	};

	const handleFrontEndRemove = (index) => {
		const list = [...frontEndList];
		list.splice(index, 1);
		setFrontEndList(list);
	};

	const handleFrontEndAdd = () => {
		setFrontEndList([...frontEndList, { frontEnd: '' }]);
	};

	return (
		<form className="frontEndForm" autoComplete="off">
			<div className="form-field">
				{frontEndList.map((singleFrontEnd, index) => (
					<div key={index} className="frontEnd">
						<div className="addFrontEnd">
							<input
								placeholder="Front-End Technology"
								name="frontEnd"
								type="text"
								id="frontEnd"
								value={singleFrontEnd.frontEnd}
								onChange={(e) => handleFrontEndChange(e, index)}
								required
							/>
							{frontEndList.length - 1 === index && (
								<button
									type="button"
									onClick={handleFrontEndAdd}
									className="add-btn"
								>
									<span>Add</span>
								</button>
							)}
						</div>

						<div className="removeFrontEnd">
							{frontEndList.length !== 1 && (
								<button
									type="button"
									onClick={() => handleFrontEndRemove(index)}
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

export default FrontEnd;
