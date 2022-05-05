import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const TopQuizzes = () => {
	const { myQuizzes, placeholderLoading } = useSelector((state) => state.myQuizzes)

	let navigate = useNavigate()

	return (
		<div className='space-y-6'>
			<Header />

			<div className='flex flex-wrap flex-col items-center justify-center sm:flex-row md:justify-start'>
				{myQuizzes.map((item, index) => (
					<div
						key={index}
						className='shadow-lg w-52 cursor-pointer mx-auto my-2 sm:mx-2 transition-all hover:scale-110'
						onClick={() => navigate(`/home/quizzes/${item?.id}`)}
					>
						<div
							data-placeholder={placeholderLoading ? true : false}
							className='relative overflow-hidden w-52 h-52 bg-gray-200'
						>
							<img className='w-full h-full object-cover' src={item?.imgUrl} alt='' />
						</div>

						<div className='p-5'>
							<p className='font-semibold text-sm my-0.5'>{item?.data?.name}</p>
							<span className='text-xs text-gray-500'>{item?.data?.quiz.length} вопросов</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default TopQuizzes

{
	/* <div className='flex items-center flex-col px-8 space-y-6 md:px-0 md:flex-row md:space-x-6 md:space-y-0'>
			{myTopQuizzes.map((item, index) => {
				return (
					<div
						key={index}
						className='shadow-lg w-full md:mx-0 md:w-1/3 cursor-pointer'
						onClick={() => navigate(`/home/quizzes/${item?.id}`)}
					>
						<div
							data-placeholder={placeholderLoading ? true : false}
							className='relative overflow-hidden w-full h-72 md:h-56 xl:h-96 bg-gray-200'
						>
							<img className='w-full h-72 md:h-56 xl:h-96 object-cover' src={item?.imgUrl} alt='' />
						</div>

						<div className='p-5'>
							<p className='font-bold my-0.5'>{item?.data?.name}</p>
							<span className='text-sm text-gray-500'>{item?.data?.quiz.length} вопросов</span>
						</div>
					</div>
				)
			})}
		</div> */
}
