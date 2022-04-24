import React, { useEffect, useState } from 'react'
import Lottie from 'react-lottie-player'
import { useLocation, useNavigate } from 'react-router-dom'

import notFoundJson from '../../assets/json/astronaout.json'

const NotFound = () => {
	const [title, setTitle] = useState('Такой страницы не существует')
	const { state } = useLocation()
	let navigate = useNavigate()

	useEffect(() => {
		if (state?.message) {
			setTitle(state?.message)
		}
	}, [state])

	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center overflow-hidden md:flex-row'>
			<Lottie className='w-1/2 md:w-1/3' play loop animationData={notFoundJson} />
			<div className='text-center md:text-left'>
				<h1 className='text-8xl font-light'>404</h1>
				<p className='my-3 text-slate-500'>{title}</p>
				<button onClick={() => navigate('/home/dashboard')} className='my-3 px-4 py-2 bg-indigo-600 text-white'>
					Вернуться на главную страницу
				</button>
			</div>
		</div>
	)
}

export default NotFound
