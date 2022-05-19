import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { QuizEndClockIcon } from '../../assets/svg/icons'
import { setQuizResult } from '../../firebase/firebase'

const QuizResult = () => {
	let navigate = useNavigate()
	const { state } = useLocation()
	const [score, setScore] = useState(0)

	const countScore = (arr) => {
		const resultArr = arr.filter((item) => item.isTrue === true)
		const _score = Math.floor((resultArr.length / arr.length) * 100)

		setQuizResult({
			quizId: state?.quizId,
			userId: state?.userId,
			userDisplayName: state?.userDisplayName,
			userPhotoURL: state?.userPhotoURL,
			userResults: state?.userResults,
			userFinishedTime: state?.userFinishedTime,
			userScore: _score,
		})

		setScore(_score)
	}

	useEffect(() => {
		if (!state) return navigate('/404')
		countScore(state?.userResults)
	}, [state, navigate])

	return (
		<div className='w-full min-h-screen relative bg-gray-100 flex flex-col justify-center items-center overflow-x-hidden text-white'>
			<div className='text-black fixed top-0 flex items-center justify-center bg-white border border-gray-400 p-2 w-full'>
				<div className='container flex justify-between items-center px-10 md:px-24 xl:px-56'>
					<h1>QuizHeader Here</h1>

					<button
						onClick={(e) => navigate('/home/dashboard')}
						className='px-5 mt-2 py-2 bg-gray-600 text-white text-sm'
					>
						Выйти
					</button>
				</div>
			</div>

			<div className='container overflow-hidden relative bg-white border border-gray-300 shadow-xl flex flex-col space-y-6 items-center mx-10 pt-10 md:mx-0'>
				<h2 className='mx-5 font-bold text-lg text-black z-20'>Поздровляем! вы прошли тест</h2>

				<div className='bg-purple-400 flex flex-col items-center z-20 justify-center space-y-2 w-40 h-40 shadow-lg rounded-full text-white'>
					<span className='text-6xl'>{state?.userResults?.length}</span>
					<span className='text-sm font-semibold'>из {state?.quiz?.quiz?.length} вопросов</span>
				</div>

				<h3 className='text-yellow-500 font-semibold'>
					Ваш результат: <span>{score}%</span>
				</h3>

				<div className='w-full flex items-center z-20 justify-center space-x-2 bg-blue-200 p-2'>
					<QuizEndClockIcon />
					<h4 className='text-blue-500 text-sm font-medium'>
						У вас ушло {state?.userFinishedTime?.minutes} минуты {state?.userFinishedTime?.seconds} секунды чтобы
						завершить тест
					</h4>
				</div>
			</div>
		</div>
	)
}

export default QuizResult
