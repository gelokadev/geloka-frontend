import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import Gallery from 'react-photo-gallery';

const heights = [300, 150, 150, 70, 90, 100, 150, 30, 50, 80];
const widths = [70, 30, 30];

const MasonryImages = () => {

	const photos = [
		{
			src: 'https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg',
			width: 3,
			height: 2
		},
		{
			src: 'https://elearningindustry.com/wp-content/uploads/2020/10/advantages-and-disadvantages-of-online-learning.jpg',
			width: 2,
			height: 1
		},
		{
			src: 'https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg',
			width: 2,
			height: 1
		},
	];

	return (
		<div>
            {/* <Gallery photos={photos} />; */}
			<Box sx={{ width: '100%', minHeight: 253 }}>
				<Masonry columns={2} spacing={2}>
					{photos.map((photo, index) => (
						<img src={photo.src} alt={'Alt with nothing'} key={index} height={heights[index]} width={widths[index]} />
					))}
				</Masonry>
			</Box>
        </div>
	)
}

export default MasonryImages;