import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ArticleIcon from '@mui/icons-material/Article';
import StarIcon from '@mui/icons-material/Star';

const Navbar = () => {
	const [direction, setDirection] = useState('left');
	const [user, setUser] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, () => {
			setUser(auth.currentUser);
		});
	}, []);

	const logout = () => {
		signOut(auth);
		onAuthStateChanged(auth, () => {
			navigate('/');
		});
	};

	// const user = auth.currentUser;
	// window.userLogin = auth.currentUser;

	return (
		<Box sx={{ height: 70, transform: 'translateZ(0px)', flexGrow: 1 }}>
			{user ? (
				<SpeedDial
					ariaLabel="SpeedDial basic example"
					sx={{ position: 'absolute', bottom: 16, right: 16 }}
					icon={<SpeedDialIcon />}
					direction={direction}
					FabProps={{
						sx: {
							bgcolor: 'black',
							'&:hover': {
								bgcolor: 'black',
							},
						},
					}}
				>
					<SpeedDialAction
						icon={<HomeIcon />}
						tooltipTitle="HOME"
						onClick={() => navigate('/')}
					/>
					<SpeedDialAction
						icon={<LogoutIcon />}
						tooltipTitle="LOGOUT"
						onClick={() => logout()}
					/>
					<SpeedDialAction
						icon={<EmojiEmotionsIcon />}
						tooltipTitle="PROFILE"
						onClick={() => navigate('/profile')}
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
			) : (
				<SpeedDial
					ariaLabel="SpeedDial basic example"
					sx={{ position: 'absolute', bottom: 16, right: 16 }}
					icon={<SpeedDialIcon />}
					direction={direction}
					FabProps={{
						sx: {
							bgcolor: 'black',
							'&:hover': {
								bgcolor: 'black',
							},
						},
					}}
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
				</SpeedDial>
			)}
		</Box>
	);
};

export default Navbar;
