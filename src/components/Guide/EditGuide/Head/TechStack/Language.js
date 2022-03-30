import React, { useState, useEffect } from 'react';
import {
	Typography,
	IconButton,
	TextField,
	InputAdornment,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Language(props) {
	const [language, setLanguage] = useState([{ language: '' }]);

	useEffect(() => {
		if (props.guide.head) {
			let editLanguage = props.guide.head.language.map((singleLanguage) => {
				return singleLanguage;
			});
			setLanguage([...editLanguage, { language: '' }]);
		}
	}, [props.guide.userId]);

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
			<div className="flexbox" style={{ paddingRight: '2rem' }}>
				<IconButton
					sx={{ paddingLeft: '2.5px' }}
					size="small"
					onClick={handleLanguageAdd}
				>
					<AddCircleOutlineIcon sx={{ color: '#468ef3' }} />
				</IconButton>

				<Typography sx={{ mt: 0.5, color: 'white' }} gutterBottom>
					Languages
				</Typography>
			</div>

			{language.map((singleLanguage, index) => (
				<TextField
					key={index}
					sx={{
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: 'white',
								borderRadius: 3,
								mt: 0.5,
								mb: 0.5,
							},
							'& adornedEnd': {
								pr: 0,
							},
						},
					}}
					name="language"
					id="language"
					onChange={(e) => handleLanguageChange(e, index)}
					variant="outlined"
					value={singleLanguage.language}
					size="small"
					InputProps={{
						startAdornment: (
							<InputAdornment style={{ marginLeft: '-15px' }} position="start">
								<IconButton
									size="small"
									onClick={() => handleLanguageRemove(index)}
								>
									<RemoveCircleOutlineIcon sx={{ color: 'gray' }} />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			))}
		</div>
	);
}
