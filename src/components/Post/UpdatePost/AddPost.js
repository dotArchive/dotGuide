import React from 'react';
import NewFile from './NewFile';
import PostHeader from './PostHeader/PostHeader';
import { useHistory } from 'react-router-dom';

export default function AddPost() {
	const history = useHistory();

	const handleCancel = () => {
		history.push('/');
	};

	const handleSave = () => {
		//Send to Database with "posted" boolean set to false
	};

	const handleSubmit = () => {
		//Send to Database with "posted" boolean set to true
	};

	return (
		<form style={{ border: '1rem solid pink' }}>
			<div className="postHeader" style={{ backgroundColor: 'red' }}>
				<PostHeader />
			</div>
			<div style={{ backgroundColor: 'green' }} className="post">
				<NewFile />
			</div>

			<div style={{ backgroundColor: 'purple' }}>
				<button type="button" onClick={handleCancel} className="cancel-btn">
					Cancel
				</button>
				<button type="submit" onClick={handleSave} className="save-btn">
					Save
				</button>
				<button type="submit" onClick={handleSubmit} className="submit-btn">
					Submit
				</button>
			</div>
		</form>
	);
}
