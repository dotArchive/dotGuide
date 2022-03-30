import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	doc,
	query,
	where,
	getDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../../firebase';
import Body from './Body/Body';
import Head from './Head/Head';
import { Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

export default function AddGuide(props) {
	/*** Hooks ***/
	const [currentUid, setCurrentUid] = useState('');
	const [user, setUser] = useState({});
	// const [guideId, setGuideId] = useState('');
	const [save, setSave] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [guide, setGuide] = useState({});

	useEffect(() => {
		setSave(false);
	}, [save]);

	useEffect(() => {
		setSubmit(false);
		if (submit === true) {
			isPublished();
			navigate('/');
		}
	}, [submit]);

	useEffect(() => {
		getGuide();
	}, []);

	let { guideId } = useParams();
	const navigate = useNavigate();
	const username = user.username;
	const userId = user.uid;

	/*** Get current UserID from FireAuth ***/
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			const uid = user.uid;
			setCurrentUid(uid);
		});
	}, [currentUid]);

	const getGuide = async () => {
		const docSnap = await getDoc(doc(db, 'guides', guideId));
		if (docSnap.exists()) {
			setGuide(docSnap.data());
		} else {
			console.log(`unable to get guide!`);
		}
	};

	/*** Updates FireStore & Publish to True ***/
	const isPublished = async () => {
		const guideRef = doc(db, 'guides', guideId);
		await updateDoc(guideRef, {
			isPublished: true,
		});
	};

	const handleCancel = () => {
		navigate('/');
	};

	return (
		<form>
			<div className="post">
				<Head
					guide={guide}
					username={username}
					guideId={guideId}
					save={save}
					submit={submit}
				/>
			</div>
			<div className="post">
				<Body guide={guide} guideId={guideId} save={save} submit={submit} />
			</div>

			<Box sx={{ display: 'flex', justifyContent: 'center', pt: 5, pb: 5 }}>
				<Button onClick={handleCancel}>
					<ArrowBackIcon
						sx={{ color: 'gray', fontSize: 36 }}
						onClick={() => navigate('/')}
					/>
				</Button>
				<Button onClick={() => setSave(true)}>
					<SaveIcon sx={{ color: '#468ef3', fontSize: 36, pl: 5, pr: 5 }} />
				</Button>
				<Button>
					<SendIcon
						sx={{ color: '#468ef3', fontSize: 36 }}
						onClick={() => setSubmit(true)}
					/>
				</Button>
			</Box>
		</form>
	);
}
