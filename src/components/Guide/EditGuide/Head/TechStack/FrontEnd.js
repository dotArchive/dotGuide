import { useEffect, useState } from 'react';

function FrontEnd(props) {
	const [frontEndList, setFrontEndList] = useState([{ frontEnd: '' }]);

	useEffect(() => {
		if (props.guide.head) {
			let editFrontEnd = props.guide.head.frontEnd.map((singleFrontEnd) => {
				return singleFrontEnd;
			});
			setFrontEndList([...editFrontEnd, { frontEnd: '' }]);
		}
	}, [props.guide.userId]);

	useEffect(() => {
		props.frontEndChild(frontEndList);
	}, [frontEndList]);

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
		<div className="form-field">
			<button type="button" onClick={handleFrontEndAdd} className="add-btn">
				Add
			</button>
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
						/>

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
	);
}

export default FrontEnd;