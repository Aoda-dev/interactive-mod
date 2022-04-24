import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowNarrowLeft } from '../../assets/svg/icons'

const Header = () => {
	let navigate = useNavigate()

	return (
		<>
			<div className='flex items-center justify-between p-5'>
				<div className='flex items-center space-x-3'>
					<button onClick={() => navigate('/home/mycourses')} className='cursor-pointer p-2 '>
						<ArrowNarrowLeft className='h-6 w-6 stroke-gray-400' />
					</button>
					<h2 className='-mt-0.5 text-lg'>Some title Here</h2>
				</div>
			</div>

			<div className='bg-neutral-900 flex flex-col space-x-0 p-10 md:flex-row md:space-x-10'>
				<div className='w-64 h-64 flex-3'>
					<img
						className='w-full h-full ring-1 ring-white object-cover'
						src='https://wallpaperaccess.com/full/3949076.jpg'
						alt=''
					/>
				</div>
				<div className='max-w-full flex-1 flex flex-col items-stretch justify-start text-white mt-10 md:mt-2 md:items-start'>
					<div className='space-y-4'>
						<h2 className='text-3xl font-semibold font-mono'>React Native</h2>
						<h3 className='font-sans'>IT Troubleshooting 101 for Analysts and Managers</h3>
						<span className='text-sm'>Проходят: 4 людей</span>
						<div className='space-x-2 text-sm'>
							<span>Создатель:</span>
							<a href='' className='underline underline-offset-1'>
								Kulseitov Tolegen
							</a>
						</div>
					</div>
					<button className='px-5 py-2 bg-indigo-600 mt-14 text-white md:mt-auto md:mb-4'>Начать</button>
				</div>
			</div>
		</>
	)
}

export default Header
