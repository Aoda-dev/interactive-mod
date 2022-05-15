import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const TopQuizzes = () => {
	const { passedQuizzes, placeholderLoading } = useSelector((state) => state.myQuizzes)

	let navigate = useNavigate()

	return (
		<div className='space-y-6'>
			<h2 className='text-2xl font-semibold'>Пройденные тесты</h2>

			<div className='flex flex-wrap flex-col items-center justify-center sm:flex-row md:justify-start'>
				{passedQuizzes.map((item, index) => (
					<div
						key={index}
						className='shadow-lg w-64 cursor-pointer mx-auto my-2 sm:mx-2 transition-all hover:scale-110 md:w-52'
						onClick={() => navigate(`/home/quizzes/${item?.id}`)}
					>
						<div
							data-placeholder={placeholderLoading ? true : false}
							className='relative overflow-hidden w-64 h-64 bg-gray-200 md:w-52 md:h-52'
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
