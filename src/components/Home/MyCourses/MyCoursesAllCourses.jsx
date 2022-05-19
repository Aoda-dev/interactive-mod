import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MyCoursesAllCourses = ({ myCourses }) => {
	const navigate = useNavigate()

	return (
		<div className='w-full px-0 pb-20 md:px-0'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-semibold my-10'>Мои курсы</h2>
				<button onClick={() => navigate('/course/create')} className='px-5 py-2 bg-indigo-500 text-white'>
					Редактор курсов
				</button>
			</div>

			<div className='flex flex-col space-y-6 pb-20'>
				{myCourses.map((course) => (
					<div key={course.id} className='w-full flex flex-col shadow-lg md:flex-row'>
						<div className='w-full h-40 md:w-80 overflow-hidden'>
							<img className='w-full h-full object-cover' src={course?.data?.img} alt='' />
						</div>
						<div className='w-full h-full px-10 py-10 space-y-3 md:py-2'>
							<h2 className='text-2xl'>{course?.data?.course?.name}</h2>
							<div>
								<p className='text-sm text-gray-400'>{course?.data?.course?.title}</p>
							</div>

							<div className='flex flex-col justify-between  py-2 space-y-6 sm:flex-row sm:space-y-0 sm:items-center'>
								<div className='text-sm text-gray-600'>
									Дата создание: {moment(new Date(course?.data?.createdAt)).format('DD/MM/YYYY hh:mm:ss')}
								</div>
								<div>
									<button
										onClick={() => navigate(`/home/courses/${course.id}`)}
										className='bg-indigo-500 text-white px-5 py-2'
									>
										Открыть курс
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{myCourses.length === 0 && (
				<div className='text-center'>
					<span className='text-center text-gray-500'>У вас пока еще нету курсов</span>
				</div>
			)}
		</div>
	)
}

export default MyCoursesAllCourses
