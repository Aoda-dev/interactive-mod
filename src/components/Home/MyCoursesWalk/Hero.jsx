// TODO: remake hero component
import moment from 'moment'
import React from 'react'

const Hero = ({ course }) => {
	console.log(course)

	return (
		<div className='flex flex-col px-10 p-5 space-y-6 md:flex-row md:space-y-0'>
			<div className='px-5 space-y-3'>
				<h2 className='text-xl font-semibold'>О курсе</h2>

				<h3 className='text-lg'>{course?.course?.title}</h3>
				<h4 className='text-md text-gray-900'>{course?.course?.aboutCourse}</h4>
				<h4 className='text-gray-700'>Создатель: {course?.creatorName}</h4>
				<h5 className='text-gray-500'>
					дата создания: {moment(new Date(course?.createdAt)).format('DD/MM/YYYY hh:mm:ss')}
				</h5>
			</div>
		</div>
	)
}

export default Hero
