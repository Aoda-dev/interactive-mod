import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({ text }) => {
	let navigate = useNavigate()

	return (
		<div className='text-black fixed top-0 flex z-20 items-center justify-center bg-white border border-gray-400 p-2 w-full'>
			<div className='container flex justify-end items-center px-10 md:px-24 xl:px-56'>
				<button onClick={(e) => navigate('/home/dashboard')} className='px-5 mt-2 py-2 bg-gray-600 text-white text-sm'>
					Выйти
				</button>
			</div>
		</div>
	)
}

export default Header
