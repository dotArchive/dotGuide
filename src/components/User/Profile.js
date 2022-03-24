import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, getDocs, doc, where, query } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
	const [currentUid, setCurrentUid] = useState('');
	const [user, setUser] = useState({});

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				setCurrentUid(uid);
			}
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

	return <div>{user.name}</div>;
};

export default Profile;
