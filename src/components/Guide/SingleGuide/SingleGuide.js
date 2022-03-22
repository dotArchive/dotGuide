import React from 'react';
import { collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export default function SingleGuide() {
	const gods = collection(db, 'gods');

	const setDummy = async () => {
		await setDoc(doc(db, 'gods', 'Christian'), {
			name: 'Jesus',
			status: 'okay',
		});
	};
	setDummy();

	const getDummies = async () => {
		const querySnapshot = await getDocs(collection(db, 'gods'));
		console.log('All Docs', querySnapshot.docs);
		querySnapshot.forEach((doc) => {
			console.log(doc.id, '=>', doc.data());
		});
	};

	const dummyRef = doc(db, 'cities', 'NYC');

	const getDummy = async () => {
		const querySnapshot = await getDoc(dummyRef);
		console.log('Single Doc ID:', querySnapshot.id);
		console.log('Single Doc', querySnapshot.data());
	};
	getDummies();
	getDummy();

	return <div>test</div>;
}
