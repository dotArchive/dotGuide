import React, { useEffect, useState } from 'react';
import BackEnd from './TechStack/BackEnd';
import FrontEnd from './TechStack/FrontEnd';
import API from './TechStack/API';
import Title from './Title';
import Tag from './Tag';
import GuideDescription from './GuideDescription';
import CodeURL from './CodeURL';

export default function Head(props) {
	const [title, setTitle] = useState('');

	useEffect(() => {
		props.child(title);
	}, [title]);

	return (
		<div>
			<Title grandChild={(data) => setTitle(data)} />
			<FrontEnd />
			<BackEnd />
			<API />
			<Tag />
			<CodeURL />
			<GuideDescription />
		</div>
	);
}
