import React from 'react'
import ReactPlayer from 'react-player/lazy'

const Video = ({ link, title }) => {
	return (
		<div className='aspect-video'>
			<ReactPlayer controls url={link} width='100%' height='100%' />
			<h2 className='p-10 text-xl drop-shadow-2xl'>{title}</h2>
		</div>
	)
}

export default Video
