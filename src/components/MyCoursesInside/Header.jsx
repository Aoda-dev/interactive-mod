import React from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { ArrowNarrowLeft } from '../../assets/svg/icons'

const Header = ({ courseId, title, subTitle, creatorName, img, createdAt }) => {
	let navigate = useNavigate()

	return (
		<>
			<div className='flex items-center justify-between p-5'>
				<div className='flex items-center space-x-3'>
					<button onClick={() => navigate(-1)} className='cursor-pointer p-2 '>
						<ArrowNarrowLeft className='h-6 w-6 stroke-gray-400' />
					</button>
					<h2 className='-mt-0.5 text-lg'>{title}</h2>
				</div>
			</div>

			<div className='bg-neutral-900 flex flex-col space-x-0 p-10 md:flex-row md:space-x-10'>
				<div className='w-64 h-64 flex-3'>
					<img className='w-full h-full ring-1 ring-white object-cover' src={img} alt='' />
				</div>
				<div className='max-w-full flex-1 flex flex-col items-stretch justify-start text-white mt-10 md:mt-2 md:items-start'>
					<div className='flex flex-col space-y-3'>
						<h2 className='text-3xl font-semibold font-mono'>{title}</h2>
						<h3 className='font-sans text-lg'>{subTitle}</h3>
						<span className='text-sm'>Дата создание: {moment(new Date(createdAt)).format('DD/MM/YYYY hh:mm:ss')}</span>
						<div className='space-x-2 text-sm'>
							<span>Создатель:</span>
							<span className='underline underline-offset-1'>{creatorName}</span>
						</div>
					</div>
					<button
						onClick={() => navigate(`/home/courses/${courseId}/walk`)}
						className='px-5 py-2 bg-indigo-600 mt-14 text-white md:mt-auto md:mb-4'
					>
						Проходить
					</button>
				</div>
			</div>
		</>
	)
}

export default Header
