import { useState } from 'react';
import Content from './Content';

function Reference() {
	const [referenceList, setReferenceList] = useState([{ reference: '' }]);

	const handleReferenceChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...referenceList];
		list[index][name] = value;
		setReferenceList(list);
	};

	const handleReferenceRemove = (index) => {
		const list = [...referenceList];
		list.splice(index, 1);
		setReferenceList(list);
	};

	const handleReferenceAdd = () => {
		setReferenceList([...referenceList, { reference: '' }]);
	};

	return (
		<div style={{ backgroundColor: 'green' }} className="form-field">
			{referenceList.map((singleReference, index) => (
				<div key={index} className="references">
					<details open>
						<summary>
							<input
								placeholder="Header"
								name="reference"
								type="text"
								id="reference"
								value={singleReference.reference}
								onChange={(e) => handleReferenceChange(e, index)}
								required
							/>
						</summary>
						{referenceList.length !== 1 && (
							<button
								type="button"
								onClick={() => handleReferenceRemove(index)}
								className="remove-btn"
							>
								<span>Remove</span>
							</button>
						)}
						<Content />
					</details>
				</div>
			))}
			<button type="button" onClick={handleReferenceAdd} className="add-btn">
				<span>Add Reference</span>
			</button>
		</div>
	);
}

export default Reference;
