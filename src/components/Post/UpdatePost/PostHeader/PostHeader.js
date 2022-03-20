import React from 'react';
import BackEnd from './BackEnd';
import FrontEnd from './FrontEnd';
import API from './API';
import Title from './Title';
import Tag from './Tag';

export default function PostHeader() {
	return (
		<div>
			<Title />
			<FrontEnd />
			<BackEnd />
			<API />
			<Tag />
		</div>
	);
}
