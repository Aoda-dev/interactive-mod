import React from 'react'
import QuizTimer from './QuizTimer'

const QuizHeader = ({ text, minutes, seconds }) => {
	return (
		<div className='flex justify-between items-center mb-10'>
			<h2 className='text-gray-700 font-semibold text-xl'>{text}</h2>
			<QuizTimer minutes={minutes} seconds={seconds} />
		</div>
	)
}

export default QuizHeader
