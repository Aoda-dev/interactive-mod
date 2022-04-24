import React from 'react'
import Lottie from 'react-lottie-player'
import * as animationData from '../../assets/json/loader.json'

const Loader = ({ ...rest }) => {
	return (
		<div {...rest}>
			<Lottie loop animationData={animationData} play />
		</div>
	)
}

export default Loader
