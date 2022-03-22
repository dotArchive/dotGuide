import React from 'react';
import BackEnd from './TechStack/BackEnd';
import FrontEnd from './TechStack/FrontEnd';
import API from './TechStack/API';
import Title from './Title';
import Tag from './Tag';
import GuideDescription from './GuideDescription';
import CodeURL from './CodeURL';

export default function Head() {
	return (
		<div>
			<Title />
			<FrontEnd />
			<BackEnd />
			<API />
			<Tag />
			<CodeURL />

			<GuideDescription />
		</div>
	);
}
