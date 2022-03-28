import React from 'react';

const Footer = () => {
	return (
		<div style={{ backgroundColor: 'orange' }} id="footer">
			<p>
				Web Design & Development by{' '}
				<a
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
