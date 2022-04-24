import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowNarrowLeft } from '../../../assets/svg/icons'

const Header = ({ title, quizId }) => {
	let navigate = useNavigate()

	return (
		<div className='flex items-center space-x-3 p-5'>
			<button onClick={() => navigate(`/home/quizzes/${quizId}`)} className='cursor-pointer p-2 '>
				<ArrowNarrowLeft className='h-6 w-6 stroke-gray-400' />
			</button>
			<h2 className='-mt-0.5 text-lg'>{title}</h2>
		</div>
	)
}

export default Header
