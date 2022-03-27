import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Body from './Body/Body';
import Head from './Head/Head';

export default function AddGuide() {
	const [save, setSave] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [guide, setGuide] = useState({});

	let { guideId } = useParams();
	const navigate = useNavigate();

	const getGuide = async () => {
		const docSnap = await getDoc(doc(db, 'Guide', guideId));
		if (docSnap.exists()) {
			setGuide(docSnap.data());
		} else {
			console.log(`unable to get guide!`);
		}
	};

	useEffect(() => {
		getGuide();
	}, []);

	const isPublished = async () => {
		const guideRef = doc(db, 'Guide', guideId);
		await updateDoc(guideRef, {
			isPublished: true,
		});
	};

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

	const handleCancel = () => {
		navigate('/');
	};

	return (
		<form>
			<div className="post">
				<Head guide={guide} guideId={guideId} save={save} submit={submit} />
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
