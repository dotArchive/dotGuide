import React from 'react';

export default function Title() {
	return (
		<div className="title">
			<div>Title:</div>
			<input placeholder="Title" name="title" type="text" id="guide" required />
		</div>
	);
}
