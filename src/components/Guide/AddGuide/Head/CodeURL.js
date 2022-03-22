import { useState } from 'react';

function CodeURL() {
	const [codeURL, setcodeURL] = useState([{ URL: '' }]);

	const handleURLChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...codeURL];
		list[index][name] = value;
		setcodeURL(list);
	};

	const handleURLRemove = (index) => {
		const list = [...codeURL];
		list.splice(index, 1);
		setcodeURL(list);
	};

	const handleURLAdd = () => {
		setcodeURL([...codeURL, { URL: '' }]);
	};

	return (
		<div className="form-field">
			<button type="button" onClick={handleURLAdd} className="add-btn">
				Add
			</button>
			{codeURL.map((singleURL, index) => (
				<div key={index} className="URL">
					<div className="addURL">
						<input
							placeholder="Github URL"
							name="URL"
							type="text"
							id="URL"
							value={singleURL.URL}
							onChange={(e) => handleURLChange(e, index)}
						/>

						{codeURL.length !== 1 && (
							<button
								type="button"
								onClick={() => handleURLRemove(index)}
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

export default CodeURL;