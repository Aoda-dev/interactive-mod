import React from 'react'

import { QuizTimerIcon } from '../../assets/svg/icons'

const QuizTimer = ({ minutes, seconds }) => {
	return (
		<div className='text-black flex items-center top-5 space-x-2'>
			<QuizTimerIcon />
			<span>
				{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
			</span>
		</div>
	)
}

export default QuizTimer
