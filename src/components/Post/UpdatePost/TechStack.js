import React from 'react';
import BackEnd from './BackEnd';
import FrontEnd from './FrontEnd';
import Language from './Language';
import API from './API';

export default function TechStack() {
	return (
		<div>
			<Language />
			<div>
				Front-End:
				<FrontEnd />
			</div>
			<div>
				Back-End:
				<BackEnd />
			</div>
			<div>
				APIs:
				<API />
			</div>
		</div>
	);
}
