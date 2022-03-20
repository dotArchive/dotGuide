import { useState } from 'react';

function API() {
	const [APIList, setAPIList] = useState([{ API: '' }]);

	const handleAPIChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...APIList];
		list[index][name] = value;
		setAPIList(list);
	};

	const handleAPIRemove = (index) => {
		const list = [...APIList];
		list.splice(index, 1);
		setAPIList(list);
	};

	const handleAPIAdd = () => {
		setAPIList([...APIList, { API: '' }]);
	};

	return (
		<form className="APIForm" autoComplete="off">
			<div className="form-field">
				{APIList.map((singleAPI, index) => (
					<div key={index} className="API">
						<div className="addAPI">
							<input
								placeholder="API Technology"
								name="API"
								type="text"
								id="API"
								value={singleAPI.API}
								onChange={(e) => handleAPIChange(e, index)}
								required
							/>
							{APIList.length - 1 === index && (
								<button
									type="button"
									onClick={handleAPIAdd}
									className="add-btn"
								>
									<span>Add</span>
								</button>
							)}
						</div>

						<div className="removeAPI">
							{APIList.length !== 1 && (
								<button
									type="button"
									onClick={() => handleAPIRemove(index)}
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

export default API;
