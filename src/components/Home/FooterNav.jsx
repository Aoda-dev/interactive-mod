import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { signOutGoogle } from '../../firebase/firebase'
import {
	NavAboutProject,
	NavIconMain,
	NavIconMainActive,
	NavLogout,
	NavMyCoursesIcon,
	NavMyCoursesIconActive,
	NavQuizIcon,
	NavQuizIconActive,
} from '../../assets/svg/icons'

const FooterNav = () => {
	let navigate = useNavigate()
	const location = useLocation()
	const [isLocation, setIsLocation] = useState(location.pathname.slice(6))

	useEffect(() => {
		setIsLocation(location.pathname.slice(6))
	}, [location])

	const signOut = () => {
		signOutGoogle()
		navigate('/')
	}

	return (
		<div className='fixed bottom-0 flex justify-center items-center bg-white w-full border border-slate-500 lg:hidden'>
			<div className='container flex justify-between items-center mx-8 sm:mx-1'>
				<div
					onClick={() => navigate('/home/dashboard')}
					className='flex flex-col p-4 cursor-pointer items-center justify-center'
				>
					{isLocation === 'dashboard' ? <NavIconMainActive /> : <NavIconMain stroke={1} />}
					<span className='hidden text-sm sm:block'>Главная</span>
				</div>

				<div
					onClick={() => navigate('/home/myquizzes')}
					className='flex flex-col p-4 cursor-pointer items-center justify-center'
				>
					{isLocation === 'myquizzes' ? <NavQuizIconActive /> : <NavQuizIcon stroke={1} />}
					<span className='hidden text-sm sm:block'>Мои тесты</span>
				</div>

				<div
					onClick={() => navigate('/home/mycourses')}
					className='flex flex-col p-4 cursor-pointer items-center justify-center'
				>
					{isLocation === 'mycourses' ? <NavMyCoursesIconActive /> : <NavMyCoursesIcon stroke={1} />}
					<span className='hidden text-sm sm:block'>Мои курсы</span>
				</div>

				<div onClick={() => navigate('/')} className='flex flex-col p-4 cursor-pointer items-center justify-center'>
					<NavAboutProject stroke={1} />
					<span className='hidden text-sm sm:block'>О проекте</span>
				</div>

				<div onClick={signOut} className='flex flex-col p-4 cursor-pointer items-center justify-center'>
					<NavLogout />
					<span className='hidden text-sm sm:block'>Выйти</span>
				</div>
			</div>
		</div>
	)
}

export default FooterNav
