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

function Tag(props) {
	const [tagList, setTagList] = useState([{ tag: '' }]);

	useEffect(() => {
		props.tagChild(tagList);
	}, [tagList]);

	const handleTagChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...tagList];
		list[index][name] = value;
		setTagList(list);
	};

	const handleTagRemove = (index) => {
		const list = [...tagList];
		list.splice(index, 1);
		setTagList(list);
	};

	const handleTagAdd = () => {
		setTagList([...tagList, { tag: '' }]);
	};

	return (
		<div className="form-field">
			<button type="button" onClick={handleTagAdd} className="add-btn">
				Add
			</button>
			<div className="flexbox">
				{tagList.map((singletag, index) => (
					<div key={index} className="tag">
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
								placeholder="Tag"
								name="tag"
								type="text"
								id="tag"
								value={singletag.tag}
								onChange={(e) => handleTagChange(e, index)}
							/>
							{tagList.length !== 1 && (
								<button
									type="button"
									onClick={() => handleTagRemove(index)}
									className="remove-btn"
								>
									<span>Remove</span>
								</button>
							)}
						</Typography>
					</div>
				))}
			</div>
		</div>
	);
}

export default Tag;
