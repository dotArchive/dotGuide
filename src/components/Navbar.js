import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LoginIcon from '@mui/icons-material/Login';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ArticleIcon from '@mui/icons-material/Article';
import StarIcon from '@mui/icons-material/Star';

const Navbar = () => {
	const [direction, setDirection] = useState('left');
	const navigate = useNavigate();

	function handleClick(e, link) {
		e.preventDefault();
		if (link === 'Login') {
			navigate('/login');
		} else if (link === 'Signup') {
			navigate('/signup');
		}
	}

	return (
		<Box sx={{ height: 70, transform: 'translateZ(0px)', flexGrow: 1 }}>
			<SpeedDial
				ariaLabel="SpeedDial basic example"
				sx={{ position: 'absolute', bottom: 16, right: 16 }}
				icon={<SpeedDialIcon />}
				direction={direction}
				onClick={handleClick}
			>
				<SpeedDialAction
					icon={<HomeIcon />}
					tooltipTitle="HOME"
					onClick={() => navigate('/')}
				/>
				<SpeedDialAction
					icon={<LoginIcon />}
					tooltipTitle="LOGIN"
					onClick={() => navigate('/login')}
				/>
				<SpeedDialAction
					icon={<GroupAddIcon />}
					tooltipTitle="SIGN UP"
					onClick={() => navigate('/signup')}
				/>
				<SpeedDialAction
					icon={<EmojiEmotionsIcon />}
					tooltipTitle="PROFILE"
					onClick={() => navigate('/user')}
				/>
				<SpeedDialAction
					icon={<ArticleIcon />}
					tooltipTitle="MY GUIDES"
					onClick={() => navigate('/user/readmes')}
				/>
				<SpeedDialAction
					icon={<StarIcon />}
					tooltipTitle="FAVORITES"
					onClick={() => navigate('/user/favorites')}
				/>
			</SpeedDial>
		</Box>
	);
};

export default Navbar;
