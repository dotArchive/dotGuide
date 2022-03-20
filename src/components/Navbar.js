import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
	<nav style={{ backgroundColor: 'yellow' }} id="navbar">
		<div>
			<Link to="/user">Profile</Link>--
			<Link to="/user/readmes">My READMEs</Link>--
			<Link to="/user/favorites">Favorites</Link>
		</div>
		<Link to="/">README(Home)</Link>
	</nav>
);

export default Navbar;
