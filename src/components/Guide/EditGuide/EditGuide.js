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
		// myQuery();
	}, [currentUid]);

	const getGuide = async () => {
		const docSnap = await getDoc(doc(db, 'Guide', guideId));
		if (docSnap.exists()) {
			setGuide(docSnap.data());
		} else {
			console.log(`unable to get guide!`);
		}
	};

	// /*** Get current User from FireStore ***/
	// const docRef = collection(db, 'users');
	// const q = query(docRef, where('uid', '==', currentUid));

	// const myQuery = async () => {
	// 	const querySnapshot = await getDocs(q);

	// 	querySnapshot.forEach((doc) => {
	// 		setUser(doc.data());
	// 	});
	// };

	/*** Create new Guide Doc in FireStore ***/
	// useEffect(() => {
	// 	const myDoc = async () => {
	// 		const mydocRef = await addDoc(collection(db, 'Guide'), {
	// 			isPublished: false,
	// 		});
	// 		setGuideId(mydocRef.id);
	// 		return mydocRef;
	// 	};
	// 	if (!props.editGuide) {
	// 		myDoc();
	// 	}
	// }, []);

	/*** Sets Owner to new Guide Doc in Firestore ***/

	/*** Updates FireStore & Publish to True ***/
	const isPublished = async () => {
		const guideRef = doc(db, 'Guide', guideId);
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
