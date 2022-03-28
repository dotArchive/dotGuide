import { useEffect, useState } from 'react';
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

function CodeURL(props) {
	const [codeURL, setcodeURL] = useState([{ URL: '' }]);

	useEffect(() => {
		props.urlChild(codeURL);
	}, [codeURL]);

	const handleURLChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...codeURL];
		list[index][name] = value;
		setcodeURL(list);
	};

	const handleURLRemove = (index) => {
		const list = [...codeURL];
		list.splice(index, 1);
		setcodeURL(list);
	};

	const handleURLAdd = () => {
		setcodeURL([...codeURL, { URL: '' }]);
	};

	return (
		<div className="form-field">
			<button type="button" onClick={handleURLAdd} className="add-btn">
				Add
			</button>
			<div className="flexbox">
				{codeURL.map((singleURL, index) => (
					<div key={index} className="URL">
						<div className="addURL">
							<Typography
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
								<input
									placeholder="URL"
									name="URL"
									type="text"
									id="URL"
									value={singleURL.URL}
									onChange={(e) => handleURLChange(e, index)}
								/>
								{codeURL.length !== 1 && (
									<button
										type="button"
										onClick={() => handleURLRemove(index)}
										className="remove-btn"
									>
										<span>Remove</span>
									</button>
								)}
							</Typography>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default CodeURL;
