import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'

const Hero = () => {
	// TODO: make pptx and dop materials here in hero and then create sections

	const percentage = 80

	return (
		<div>
			<div className='w-56 h-56'>
				<CircularProgressbar value={percentage} text={`${percentage}%`} />
			</div>
		</div>
	)
}

export default Hero
