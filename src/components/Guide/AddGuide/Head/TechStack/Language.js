import React, { useState, useEffect } from 'react';
import {
	Typography,
	Box,
	IconButton,
	Button,
	Card,
	Container,
} from '@mui/material';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';

export default function Language(props) {
	const [language, setLanguage] = useState([{ language: '' }]);

	useEffect(() => {
		props.languageChild(language);
	}, [language]);

	const handleLanguageChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...language];
		list[index][name] = value;
		setLanguage(list);
	};

	const handleLanguageRemove = (index) => {
		const list = [...language];
		list.splice(index, 1);
		setLanguage(list);
	};

	const handleLanguageAdd = () => {
		setLanguage([...language, { language: '' }]);
	};

	return (
		<div>
			<Typography sx={{ color: 'white' }} gutterBottom>
				Languages
			</Typography>
			<button type="button" onClick={handleLanguageAdd} className="add-btn">
				Add
			</button>
			{language.map((singleLanguage, index) => (
				<Typography
					key={index}
					sx={{
						color: 'white',
						fontSize: '0.7em',
						minHeight: 18,
						p: 0.5,
						mt: 0.5,
						mb: 0.5,
						border: 1,
						borderColor: 'white',
						borderRadius: 3,
						textAlign: 'center',
					}}
				>
					{' '}
					<input
						placeholder="Programming Language"
						name="language"
						id="language"
						type="text"
						value={singleLanguage.language}
						onChange={(e) => handleLanguageChange(e, index)}
					/>
					{language.length !== 1 && (
						<button
							type="button"
							onClick={() => handleLanguageRemove(index)}
							className="remove-btn"
						>
							<span>Remove</span>
						</button>
					)}
				</Typography>
			))}
		</div>
	);
}
