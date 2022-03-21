import { useState } from 'react';

function Tag() {
	const [tagList, setTagList] = useState([{ tag: '' }]);

	const handleTagChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...tagList];
		list[index][name] = value;
		setTagList(list);
	};

	const handleTagRemove = (index) => {
		const list = [...tagList];
		list.splice(index, 1);
		setTagList(list);
	};

	const handleTagAdd = () => {
		setTagList([...tagList, { tag: '' }]);
	};

	return (
		<div className="form-field">
			{tagList.map((singletag, index) => (
				<div key={index} className="tag">
					<div className="addTag">
						<input
							placeholder="Tag"
							name="tag"
							type="text"
							id="tag"
							value={singletag.tag}
							onChange={(e) => handleTagChange(e, index)}
						/>

						{tagList.length !== 1 && (
							<button
								type="button"
								onClick={() => handleTagRemove(index)}
								className="remove-btn"
							>
								<span>Remove</span>
							</button>
						)}

						{tagList.length - 1 === index && (
							<button type="button" onClick={handleTagAdd} className="add-btn">
								<span>Add</span>
							</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default Tag;
