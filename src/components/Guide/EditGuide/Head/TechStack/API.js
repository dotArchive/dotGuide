import { useEffect, useState } from 'react';

function API(props) {
	const [APIList, setAPIList] = useState([{ API: '' }]);

	useEffect(() => {
		if (props.guide.head) {
			let editAPI = props.guide.head.API.map((singleAPI) => {
				return singleAPI;
			});
			setAPIList([...editAPI, { API: '' }]);
		}
	}, [props.guide.userId]);

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

	useEffect(() => {
		props.apiChild(APIList);
	}, [APIList]);

	return (
		<div className="form-field">
			<button type="button" onClick={handleAPIAdd} className="add-btn">
				Add
			</button>

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
						/>
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
	);
}

export default API;
