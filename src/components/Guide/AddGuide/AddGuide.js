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
	// User
	const [currentUid, setCurrentUid] = useState('');
	const [user, setUser] = useState({});

	// Head
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState([]);
	const [urls, setUrls] = useState([]);
	const [APIs, setAPIs] = useState([]);
	const [frontEnds, setFrontEnds] = useState([]);
	const [backEnds, setBackEnds] = useState([]);

	// Body
	const [files, setFiles] = useState([]);
	const [language, setLanguage] = useState([]);
	const [code, setCode] = useState([]);

	// Get current UserID from Auth
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			const uid = user.uid;
			setCurrentUid(uid);
		});
		myQuery();
	}, [currentUid]);

	// Get current User from Firestore
	const docRef = collection(db, 'users');
	const q = query(docRef, where('uid', '==', currentUid));

	const myQuery = async () => {
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			setUser(doc.data());
		});
	};

	// Constants for Setting FireStore Guide
	// User
	const guideRef = collection(db, 'Guide');
	const username = user.name;
	const userId = user.uid;

	// Head
	const tag = tags.map((tag) => {
		return tag;
	});
	const url = urls.map((url) => {
		return url;
	});
	const API = APIs.map((API) => {
		return API;
	});
	const frontEnd = frontEnds.map((frontEnd) => {
		return frontEnd;
	});
	const backEnd = backEnds.map((backEnd) => {
		return backEnd;
	});

	// Body
	const body = files.map((fileName) => {
		const filePath = {
			fileName,
			language,
			code,
		};

		return filePath;
	});

	// Set FireStore Guide
	const setGuide = async () => {
		await setDoc(doc(guideRef, 'myRandomId'), {
			body,

			head: {
				API,
				backEnd,
				description,
				frontEnd,
				url,
				tag,
				title,
			},
			userId,
			username,
			isPublished: false,
		});
	};
	// Handle Buttons
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
				<Head
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
				<Body
					fileChild={(data) => setFiles(data)}
					languageChild={(data) => setLanguage(data)}
					codeChild={(data) => setCode(data)}
				/>
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
