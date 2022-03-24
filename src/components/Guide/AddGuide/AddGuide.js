import { useState, useEffect } from 'react';
import Body from './Body/Body';
import Head from './Head/Head';
import { useNavigate } from 'react-router-dom';
import {
	collection,
	doc,
	setDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AddGuide() {
	const [currentUid, setCurrentUid] = useState('');
	const [user, setUser] = useState({});
	const [title, setTitle] = useState('');

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			const uid = user.uid;
			setCurrentUid(uid);
		});
		myQuery();
	}, [currentUid]);

	const docRef = collection(db, 'users');
	const q = query(docRef, where('uid', '==', currentUid));

	const myQuery = async () => {
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			setUser(doc.data());
		});
	};

	const username = user.name;
	const userId = user.uid;

	const guideRef = collection(db, 'Guide');

	// SetSingle
	const setGuide = async () => {
		await setDoc(doc(guideRef), {
			// body: {
			// 	files: [
			// 		{
			// 			filePath: '',
			// 			language: '',
			// 			codeBlock: '',
			// 			reference: [
			// 				{
			// 					header: '',
			// 					content: '',
			// 				},
			// 			],
			// 		},
			// 	],
			// },
			// head: {
			// 	APIs: {},
			// 	backEnd: {},
			// 	frontEnd: {},
			// 	githubUrl: '',
			// 	tags: {},
			// 	title: '',
			// },
			title: title,
			isPublished: false,
			userId: userId,
			username: username,
		});
	};

	const navigate = useNavigate();

	const handleCancel = () => {
		navigate('/');
	};

	const handleSave = () => {
		setGuide();
	};

	const handleSubmit = () => {
		setGuide();
	};

	return (
		<form style={{ border: '1rem solid pink' }}>
			<div className="postHeader" style={{ backgroundColor: 'red' }}>
				<Head child={(data) => setTitle(data)} />
			</div>
			<div style={{ backgroundColor: 'blue' }} className="post">
				<Body />
			</div>

			<div style={{ backgroundColor: 'pink' }}>
				<button type="button" onClick={handleCancel} className="cancel-btn">
					Cancel
				</button>
				<button type="submit" onClick={handleSave} className="save-btn">
					Save
				</button>
				<button type="submit" onClick={handleSubmit} className="submit-btn">
					Submit
				</button>
			</div>
		</form>
	);
}
