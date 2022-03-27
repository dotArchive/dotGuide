import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	doc,
	getDoc,
	query,
	where,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../../firebase';
import Body from './Body/Body';
import Head from './Head/Head';

export default function AddGuide(props) {
	// Hooks & Variables
	const [currentUid, setCurrentUid] = useState('');
	const [user, setUser] = useState({});
	const [disable, setDisable] = useState(false);
	const [guideId, setGuideId] = useState('');
	const [save, setSave] = useState(false);
	const [submit, setSubmit] = useState(false);

	const navigate = useNavigate();
	const username = user.username;
	const userId = user.uid;

	// Get current UserID from FireAuth
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			const uid = user.uid;
			setCurrentUid(uid);
		});
		myQuery();
	}, [currentUid]);

	// Get current User from FireStore
	const docRef = collection(db, 'users');
	const q = query(docRef, where('uid', '==', currentUid));

	const myQuery = async () => {
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			setUser(doc.data());
		});
	};

	// Create new Guide Doc
	useEffect(() => {
		const myDoc = async () => {
			const mydocRef = await addDoc(collection(db, 'Guide'), {
				isPublished: false,
			});
			setGuideId(mydocRef.id);
			return mydocRef;
		};
		if (!props.editGuide) {
			myDoc();
		}
	}, []);

	const setOwner = async () => {
		const guideRef = doc(db, 'Guide', guideId);
		await updateDoc(guideRef, {
			userId,
			username,
		});
	};

	const isPublished = async () => {
		const guideRef = doc(db, 'Guide', guideId);
		await updateDoc(guideRef, {
			userId,
			username,
			isPublished: true,
		});
	};

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

	const handleCancel = () => {
		navigate('/');
	};

	return (
		<form>
			<div className="post">
				<Head guideId={guideId} save={save} submit={submit} />
			</div>
			<div className="post">
				<Body guideId={guideId} save={save} submit={submit} />
			</div>

			<div>
				<button type="button" onClick={handleCancel} className="cancel-btn">
					Cancel
				</button>
				<button
					type="button"
					onClick={() => setSave(true)}
					className="save-btn"
				>
					Save Draft
				</button>
				<button
					type="submit"
					onClick={() => setSubmit(true)}
					className="submit-btn"
				>
					Post Guide
				</button>
			</div>
		</form>
	);
}
