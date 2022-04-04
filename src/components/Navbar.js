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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
					icon={<SpeedDialIcon sx={{ color: '#fffff' }} />}
					direction={direction}
					FabProps={{
						sx: {
							bgcolor: '#0e65de',
							'&:hover': {
								bgcolor: '#468ef3',
							},
						},
					}}
				>
					<SpeedDialAction
						sx={{
							backgroundColor: '#2f2f2f',
							'&:hover': { bgcolor: '#1f1f1f' },
						}}
						icon={<HomeIcon sx={{ color: 'white' }} />}
						tooltipTitle="HOME"
						onClick={() => navigate('/')}
					/>
					<SpeedDialAction
						sx={{
							backgroundColor: '#2f2f2f',
							'&:hover': { bgcolor: '#1f1f1f' },
						}}
						icon={<LogoutIcon sx={{ color: 'white' }} />}
						tooltipTitle="LOGOUT"
						onClick={() => logout()}
					/>
					<SpeedDialAction
						sx={{
							backgroundColor: '#2f2f2f',
							'&:hover': { bgcolor: '#1f1f1f' },
						}}
						icon={<EmojiEmotionsIcon sx={{ color: 'white' }} />}
						tooltipTitle="PROFILE"
						onClick={() => navigate('/profile')}
					/>
					<SpeedDialAction
						sx={{
							backgroundColor: '#2f2f2f',
							'&:hover': { bgcolor: '#1f1f1f' },
						}}
						icon={<AddCircleOutlineIcon sx={{ color: 'white' }} />}
						tooltipTitle="ADD GUIDE"
						onClick={() => navigate('/guide/add')}
					/>
				</SpeedDial>
			) : (
				<SpeedDial
					ariaLabel="SpeedDial basic example"
					sx={{ position: 'absolute', bottom: 16, right: 16 }}
					icon={<SpeedDialIcon sx={{ color: '#ffffff' }} />}
					direction={direction}
					FabProps={{
						sx: {
							bgcolor: '#0e65de',
							'&:hover': {
								bgcolor: '#468ef3',
							},
						},
					}}
				>
					<SpeedDialAction
						sx={{
							backgroundColor: '#2f2f2f',
							'&:hover': { bgcolor: '#1f1f1f' },
						}}
						icon={<HomeIcon sx={{ color: 'white' }} />}
						tooltipTitle="HOME"
						onClick={() => navigate('/')}
					/>
					<SpeedDialAction
						sx={{
							backgroundColor: '#2f2f2f',
							'&:hover': { bgcolor: '#1f1f1f' },
						}}
						icon={<LoginIcon sx={{ color: 'white' }} />}
						tooltipTitle="LOGIN"
						onClick={() => navigate('/login')}
					/>
					<SpeedDialAction
						sx={{
							backgroundColor: '#2f2f2f',
							'&:hover': { bgcolor: '#1f1f1f' },
						}}
						icon={<GroupAddIcon sx={{ color: 'white' }} />}
						tooltipTitle="SIGN UP"
						onClick={() => navigate('/signup')}
					/>
				</SpeedDial>
			)}
		</Box>
	);
};

export default Navbar;
