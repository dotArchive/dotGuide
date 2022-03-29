import React from 'react';

const Footer = () => {
	return (
		<div
			style={{
				display: 'flex',
				backgroundColor: '#2f2f2f',
				justifyContent: 'center',
			}}
			id="footer"
		>
			<p style={{ color: 'white' }}>
				Web Design & Development by{' '}
				<a
					style={{ color: '#f57c00' }}
					href="https://github.com/dotArchive/dotGuide"
					target="_blank"
					rel="noopener noreferrer"
				>
					{`<dotGuide />`}
				</a>
			</p>
		</div>
	);
};

export default Footer;
