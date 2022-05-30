import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { signOutGoogle } from '../../firebase/firebase'

import {
	AuthorIcon,
	AuthorIconActive,
	NavIconMain,
	NavIconMainActive,
	NavLogout,
	NavMyCoursesIcon,
	NavMyCoursesIconActive,
	NavQuizIcon,
	NavQuizIconActive,
} from '../../assets/svg/icons'

const NavMenu = () => {
	const location = useLocation()

	const { user, loading } = useSelector((state) => state.user)
	const [isLocation, setIsLocation] = useState(location.pathname.slice(6))

	const activeLink = 'bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500'

	useEffect(() => {
		setIsLocation(location.pathname.slice(6))
	}, [location])

	let navigate = useNavigate()

	const signOut = () => {
		signOutGoogle()
		navigate('/')
	}

	return (
		<div className='h-screen hidden my-4 ml-4 shadow-lg relative w-80 lg:block'>
			<div className='bg-white h-full'>
				<div className='flex justify-center items-center py-14'>
					<div
						data-placeholder={loading ? true : false}
						className='relative rounded-full overflow-hidden w-24 h-24 bg-gray-200'
					>
						<img className='inline-block h-24 w-24 rounded-full object-cover' src={user?.photoURL} alt='' />
					</div>
				</div>

				<div className='w-full'>
					<Link
						to='/home/dashboard'
						className={`w-full inline-flex items-center space-x-6 font-thin uppercase ${
							isLocation === 'dashboard' ? 'text-blue-500' : 'hover:text-blue-500'
						} p-4 my-2 transition-colors duration-200 justify-start ${isLocation === 'dashboard' ? activeLink : null}`}
					>
						{isLocation === 'dashboard' ? <NavIconMainActive /> : <NavIconMain />}
						<span className='text-sm font-normal'>Главная</span>
					</Link>

					<Link
						to='/home/myquizzes'
						className={`w-full inline-flex items-center space-x-6 font-thin uppercase ${
							isLocation === 'myquizzes' ? 'text-blue-500' : 'hover:text-blue-500'
						} p-4 my-2 transition-colors duration-200 justify-start ${isLocation === 'myquizzes' ? activeLink : null}`}
					>
						{isLocation === 'myquizzes' ? <NavQuizIconActive /> : <NavQuizIcon />}
						<span className='text-sm font-normal'>Мои Тесты</span>
					</Link>

					<Link
						to='/home/mycourses'
						className={`w-full inline-flex items-center space-x-6 font-thin uppercase ${
							isLocation === 'mycourses' ? 'text-blue-500' : 'hover:text-blue-500'
						} p-4 my-2 transition-colors duration-200 justify-start ${isLocation === 'mycourses' ? activeLink : null}`}
					>
						{isLocation === 'mycourses' ? <NavMyCoursesIconActive /> : <NavMyCoursesIcon />}
						<span className='text-sm font-normal'>Мои Курсы</span>
					</Link>

					<Link
						to='/home/author'
						className={`w-full inline-flex items-center space-x-6 font-thin uppercase ${
							isLocation === 'author' ? 'text-blue-500' : 'hover:text-blue-500'
						} p-4 my-2 transition-colors duration-200 justify-start ${isLocation === 'author' ? activeLink : null}`}
					>
						{isLocation === 'author' ? <AuthorIconActive /> : <AuthorIcon />}
						<span className='text-sm font-normal'>Автор</span>
					</Link>

					<a
						onClick={signOut}
						href='#'
						className='w-full inline-flex items-center space-x-6 font-thin uppercase hover:text-blue-500 p-4 my-2 transition-colors duration-200 justify-start'
					>
						<NavLogout />
						<span className='text-sm font-normal'>Выйти</span>
					</a>
				</div>
			</div>
		</div>
	)
}

export default NavMenu
