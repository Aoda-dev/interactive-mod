import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
	const { user, loading } = useSelector(state => state.user)

	return (
		<header className='w-full relative shadow-lg bg-white flex justify-between px-8 items-center h-16 z-40'>
			<h2 className='font-bold text-1xl'>Привет {user?.displayName}!</h2>

			<div
				data-placeholder={loading ? true : false}
				className='relative overflow-hidden w-9 h-9 rounded-full bg-gray-200'
			>
				<img className='w-9 h-9 rounded-full object-cover cursor-pointer' src={user?.photoURL} alt='user' />
			</div>
		</header>
	)
}

export default Header
