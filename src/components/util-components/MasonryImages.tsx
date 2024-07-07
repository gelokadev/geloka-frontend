import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import Gallery from 'react-photo-gallery';
import { getFilePath } from '../../datas/helper';


const MasonryImages = ({ medias } : {medias: string[]}) => {


	return (
		<div>
            {/* <Gallery photos={photos} />; */}
			<Box sx={{ width: '100%', minHeight: 253 }}>
				<Masonry columns={2} spacing={2}>
					{medias.map((photo, index) => (
						<img src={getFilePath(photo)} alt={'Alt with nothing'} key={index} />
					))}
				</Masonry>
			</Box>
        </div>
	)
}

export default MasonryImages;