import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyAllQuizzes = () => {
	const { myQuizzes } = useSelector(state => state.myQuizzes)

	let navigate = useNavigate()

	return (
		<div>
			<h2 className='text-2xl font-semibold mt-10'>Все тесты</h2>

			<div className='flex flex-col mt-5 mb-20'>
				{myQuizzes.map((item, index) => {
					return (
						<div key={index} className='flex items-center py-5 px-10 shadow-sm border shadow-gray-300'>
							<span className='hidden text-slate-600 mr-8 sm:block md:mr-16'>{item.data.createdAt}</span>
							<span className='mr-auto text-slate-800'>{item.data.name}</span>
							<span className='hidden text-slate-800 mr-10 sm:block'>{item.data.quiz.length} вопрос</span>
							<button onClick={() => navigate(`/home/quizzes/${item.id}`)} className='bg-blue-600 text-white px-5 py-2'>
								Открыть
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default MyAllQuizzes
