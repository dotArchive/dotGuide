
import React from 'react';
import Language from './Code/Language';
import File from './File';

export default function Body(props) {
	const guideId = props.guideId;
	return (
		<div style={{ border: '1rem solid blue' }}>
			<File guideId={guideId} />
			<Language guideId={guideId} />
		</div>
	);
}
