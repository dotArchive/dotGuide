import { useState } from 'react';

function BackEnd() {
	const [backEndList, setBackEndList] = useState([{ backEnd: '' }]);

	const handleBackEndChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...backEndList];
		list[index][name] = value;
		setBackEndList(list);
	};

	const handleBackEndRemove = (index) => {
		const list = [...backEndList];
		list.splice(index, 1);
		setBackEndList(list);
	};

	const handleBackEndAdd = () => {
		setBackEndList([...backEndList, { backEnd: '' }]);
	};

	return (
		<div className="form-field">
			{backEndList.map((singlebackEnd, index) => (
				<div key={index} className="backEnd">
					<div className="addBackEnd">
						<input
							placeholder="Back-End Technology"
							name="backEnd"
							type="text"
							id="backEnd"
							value={singlebackEnd.backEnd}
							onChange={(e) => handleBackEndChange(e, index)}
						/>

						{backEndList.length !== 1 && (
							<button
								type="button"
								onClick={() => handleBackEndRemove(index)}
								className="remove-btn"
							>
								<span>Remove</span>
							</button>
						)}

						{backEndList.length - 1 === index && (
							<button
								type="button"
								onClick={handleBackEndAdd}
								className="add-btn"
							>
								<span>Add</span>
							</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default BackEnd;
