import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateQuizButtonIcon } from '../../../assets/svg/icons'

const Header = () => {
	let navigate = useNavigate()

	return (
		<div className='flex justify-between items-center px-5 my-5 md:px-0'>
			<h2 className='text-2xl font-semibold'>Мой тесты</h2>
			<div onClick={() => navigate('/quiz/create')} className='flex items-center cursor-pointer'>
				<CreateQuizButtonIcon />
				<span className=' text-blue-600 font-bold text-base'>Создать тест</span>
			</div>
		</div>
	)
}

export default Header
