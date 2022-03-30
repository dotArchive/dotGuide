import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	doc,
	query,
	where,
	serverTimestamp,
	arrayUnion,
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
	const [guideId, setGuideId] = useState('');
	const [save, setSave] = useState(false);
	const [submit, setSubmit] = useState(false);

	useEffect(() => {
		setSave(false);
		if (save === true) setOwner();
	}, [save]);

	useEffect(() => {
		setSubmit(false);
		if (submit === true) {
			isPublished();
			navigate('/');
		}
	}, [submit]);

	const navigate = useNavigate();
	const username = user.username;
	const userId = user.uid;

	/*** Get current UserID from FireAuth ***/
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			const uid = user.uid;
			setCurrentUid(uid);
		});
		myQuery();
	}, [currentUid]);

	/*** Get current User from FireStore ***/
	const docRef = collection(db, 'users');
	const q = query(docRef, where('uid', '==', currentUid));

	const myQuery = async () => {
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			setUser(doc.data());
		});
	};
	/*** Create new Guide Doc in FireStore ***/
	useEffect(() => {
		const myDoc = async () => {
			const mydocRef = await addDoc(collection(db, 'guides'), {
				isPublished: false,
				createdAt: serverTimestamp(),
				favorites: 0,
			});
			setGuideId(mydocRef.id);
			return mydocRef;
		};
		myDoc();
	}, []);

	/*** Sets Owner to new Guide Doc in Firestore ***/
	const setOwner = async () => {
		const guideRef = doc(db, 'guides', guideId);
		await updateDoc(guideRef, {
			userId,
			username,
			createdAt: serverTimestamp(),
		});
		const q = query(
			collection(db, 'profiles'),
			where('userId', '==', auth.currentUser.uid)
		);
		const qS = await getDocs(q);
		const profileId = qS.docs[0].id;
		await updateDoc(doc(db, 'profiles', profileId), {
			guides: arrayUnion(guideId),
		});
		// console.log('setting owner')
	};

	/*** Updates FireStore & Publish to True ***/
	const isPublished = async () => {
		const guideRef = doc(db, 'guides', guideId);
		await updateDoc(guideRef, {
			userId,
			username,
			createdAt: serverTimestamp(),
			isPublished: true,
		});
		const q = query(
			collection(db, 'profiles'),
			where('userId', '==', auth.currentUser.uid)
		);
		const qS = await getDocs(q);
		const profileId = qS.docs[0].id;
		await updateDoc(doc(db, 'profiles', profileId), {
			guides: arrayUnion(guideId),
		});
		// console.log('setting published')
	};

	const handleCancel = () => {
		navigate('/');
	};

	return (
		<form>
			{console.log(guideId)}
			<div className="post">
				<Head
					username={username}
					guideId={guideId}
					save={save}
					submit={submit}
				/>
			</div>
			<div className="post">
				<Body guideId={guideId} save={save} submit={submit} />
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
