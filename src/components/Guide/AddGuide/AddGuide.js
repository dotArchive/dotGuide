import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../../../firebase';
import Body from './Body/Body';
import Head from './Head/Head';

export default function AddGuide() {
	// Hoisting Head, refactor
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState([]);
	const [urls, setUrls] = useState([]);
	const [APIs, setAPIs] = useState([]);
	const [frontEnds, setFrontEnds] = useState([]);
	const [backEnds, setBackEnds] = useState([]);

	// Constants for Setting FireStore Guide
	// const tag = tags.map((tag) => {
	// 	return tag;
	// });
	// const url = urls.map((url) => {
	// 	return url;
	// });
	// const API = APIs.map((API) => {
	// 	return API;
	// });
	// const frontEnd = frontEnds.map((frontEnd) => {
	// 	return frontEnd;
	// });
	// const backEnd = backEnds.map((backEnd) => {
	// 	return backEnd;
	// })

	//////////////////////////////

	// Hooks & Variables
	const [currentUid, setCurrentUid] = useState('');
	const [user, setUser] = useState({});
	const [disable, setDisable] = useState(false);
	const [guideId, setGuideId] = useState('');

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
		myDoc();
	}, []);

	// Handle Buttons
	const handleStart = () => {
		setDisable(true);
	};

	const handleCancel = () => {
		navigate('/');
	};

	const handleSave = () => {
		// setGuide();
	};

	const handleSubmit = () => {
		// setGuide();
		// myDoc();
	};

	return (
		<form style={{ border: '1rem solid pink' }}>
			<button disabled={disable} onClick={handleStart}>
				Get Started
			</button>

			<div className="postHeader" style={{ backgroundColor: 'red' }}>
				<Head
					guideId={guideId}
					titleChild={(data) => setTitle(data)}
					tagChild={(data) => setTags(data)}
					urlChild={(data) => setUrls(data)}
					descriptionChild={(data) => setDescription(data)}
					apiChild={(data) => setAPIs(data)}
					frontEndChild={(data) => setFrontEnds(data)}
					backEndChild={(data) => setBackEnds(data)}
				/>
			</div>
			<div style={{ backgroundColor: 'blue' }} className="post">
				<Body guideId={guideId} />
			</div>

			<div style={{ backgroundColor: 'pink' }}>
				<button type="button" onClick={handleCancel} className="cancel-btn">
					Cancel
				</button>
				<button type="button" onClick={handleSave} className="save-btn">
					Save
				</button>
				<button type="submit" onClick={handleSubmit} className="submit-btn">
					Submit
				</button>
			</div>
		</form>
	);
}
