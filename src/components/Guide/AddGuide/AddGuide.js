import React from 'react';
import Body from './Body/Body';
import Head from './Head/Head';
import { useNavigate } from 'react-router-dom';

export default function AddGuide() {
	const navigate = useNavigate();

	const handleCancel = () => {
		navigate('/');
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
				<Head />
			</div>
			<div style={{ backgroundColor: 'blue' }} className="post">
				<Body />
			</div>

			<div style={{ backgroundColor: 'pink' }}>
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
