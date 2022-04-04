import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
//firestore imports
import {
	collection,
	doc,
	getDocs,
	getDoc,
	setDoc,
	query,
	where,
	updateDoc,
	arrayUnion,
	arrayRemove,
	increment,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';

export default function PublishGuide() {
	const [guide, setGuide] = useState({ head: '' });

	const navigate = useNavigate();
	const guideId = useParams().guideId;

	console.log(guide.head.title);

	useEffect(() => {
		const getGuide = async () => {
			const docRef = doc(db, 'guides', guideId);
			const docSnap = await getDoc(docRef);
			console.log(docSnap.data());
			if (docSnap.exists()) {
				setGuide(docSnap.data());
			} else {
				console.log(`unable to get guide!`);
			}
		};
		if (Object.keys(guide).length === 0) {
			getGuide();
		}
	}, [guideId]);

	const outerContainer = {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
	};

	const singleGuideTopCard = {
		background: '#2f2f2f',
		p: 1,
		pl: 2,
		mt: 1,
		border: 1.25,
		borderColor: '#353540',
	};

	const typographyWhiteMargin = {
		color: 'white',
		ml: 1,
		mt: 1,
		justifyContent: 'center',
		textAlign: 'center',
	};

	const searchButtons = {
		ml: 3,
		mt: 3,
		py: 0.5,
		borderRadius: 10,
		color: '#468ef3',
		width: '130px',
		border: 2,
		borderColor: '#102040',
	};

	return (
		<Container sx={outerContainer}>
			<Typography variant="h3" sx={typographyWhiteMargin}>
				{guide.head.title ? guide.head.title : 'Your Guide'}
			</Typography>
			<Typography variant="h3" sx={typographyWhiteMargin}>
				has been successfully published!
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<Button
					onClick={() => navigate(`/guide/${guideId}`)}
					sx={searchButtons}
				>
					VIEW GUIDE
				</Button>
				<Button onClick={() => navigate('/guide/add')} sx={searchButtons}>
					NEW GUIDE
				</Button>
				<Button onClick={() => navigate('/profile')} sx={searchButtons}>
					PROFILE
				</Button>
				<Button onClick={() => navigate('/')} sx={searchButtons}>
					HOME
				</Button>
			</Box>
			<p />
		</Container>
	);
}
