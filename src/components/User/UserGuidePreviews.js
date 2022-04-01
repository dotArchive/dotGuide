import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';

const UserGuidePreview = (guides) => {
	const [arr, setArr] = useState([]);
	const [guideIds, setGuideIds] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		setArr(guides.props.guides);
		setGuideIds(guides.props.list);
	}, [guides.props]);

	const handleGuideClick = (guideId) => {
		navigate(`/guide/${guideId}`);
	};

	/*** styles  start ***/
	const mapCard = {
		background: '#2f2f2f',
		color: 'white',
		borderRadius: 1,
		ml: 'auto',
		mr: 'auto',
		my: 0.5,
		'&:hover': { cursor: 'pointer' },
		display: 'flex',
		justifyContent: 'flex-start',
		width: '50%',
		border: 1.25,
		borderColor: '#353540',
	};
	const titleTypography = {
		fontSize: '1.5em',
		fontWeight: 'bold',
		textOverflow: 'ellipsis',
		ml: 1,
	};
	const usernameTypography = {
		color: '#cccccc',
		fontSize: '1em',
		ml: 1,
	};
	const bookmarkSX = {
		ml: 2,
		mr: 0.25,
		fontSize: 15,
		color: 'white',
	};
	const tagBox = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
	};
	const tagMap = {
		px: 1,
		my: 0.5,
		mx: 0.5,
		borderRadius: 2.5,
		typography: 'body2',
		fontSize: '0.75em',
		background: 'transparent',
		color: 'white',
		border: 1,
		maxWidth: '20ch',
	};
	return (
		<>
			{arr.length
				? arr.map((guide, idx) => {
						const { username, favorites, tags } = guide;
						return (
							<Card
								sx={mapCard}
								onClick={() => {
									handleGuideClick(guideIds[idx]);
								}}
								key={idx}
							>
								<CardContent sx={{ py: 1, width: '100%' }}>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										<Typography variant="h5" sx={titleTypography}>
											{guide.head.title ? guide.head.title : null}
										</Typography>
										<Typography sx={{ color: '#66bb6a' }}>
											{guide.isPublished ? 'Published' : null}
										</Typography>
									</Box>
									<Typography sx={usernameTypography}>
										{`— ${username ? username : null}`}
										<BookmarkRoundedIcon sx={bookmarkSX} />
										<span style={{ color: '#468ef3', fontSize: 18 }}>{`${
											favorites !== null ? favorites : null
										}`}</span>
									</Typography>
									<Box sx={tagBox}>
										{tags
											? tags.map((tag, idx) => {
													return idx <= 4 ? (
														<Box key={idx} sx={tagMap}>
															{tag}
														</Box>
													) : null;
											  })
											: null}
									</Box>
								</CardContent>
							</Card>
						);
				  })
				: null}
		</>
	);
};

export default UserGuidePreview;
