import React from 'react'
import { useNavigate } from 'react-router-dom'

const MyCoursesAllCourses = () => {
	const navigate = useNavigate()

	return (
		<div className='w-full px-0 pb-20 md:px-0'>
			<h2 className='text-2xl font-semibold my-10'>Мои курсы</h2>

			<div className='flex flex-col space-y-6 pb-20'>
				<div className='w-full flex flex-col shadow-lg md:flex-row'>
					<div className='w-full h-58 md:w-80'>
						<img className='w-full h-full object-cover' src='https://wallpaperaccess.com/full/3949076.jpg' alt='' />
					</div>
					<div className='w-full h-full px-10 py-10 space-y-3 md:py-2'>
						<h2 className='text-2xl'>React Native</h2>
						<div>
							<p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
						</div>

						<div className='flex flex-col justify-between  py-2 space-y-6 sm:flex-row sm:space-y-0 sm:items-center'>
							<div className='text-sm text-gray-600'>Дата создание: 15 Jan 2021</div>
							<div>
								<button
									onClick={() => navigate('/home/courses/something')}
									className='bg-indigo-500 text-white px-5 py-2'
								>
									Открыть курс
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyCoursesAllCourses
