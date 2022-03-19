import React, { useState } from 'react';

import Editor from './Editor';

const SinglePost = (props) => {
	const [html, setHTML] = useState('');

	return (
		<div>
			SinglePost
			<div>
				<Editor
					language="javascript"
					displayName="JS"
					value={html}
					onChange={setHTML}
				/>
			</div>
		</div>
	);
};

export default SinglePost;
