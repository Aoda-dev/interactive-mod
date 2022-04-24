import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import Hero from './Hero'
import QuizzesOptions from './QuizzesOptions'
import QuizzesProgress from './QuizzesProgress'

const MyQuizzesResult = () => {
	let navigate = useNavigate()
	const { state } = useLocation()

	useEffect(() => {
		if (!state) navigate('/404')
	}, [state, navigate])

	return (
		<div className='px-0 pb-20'>
			<Header quizId={state?.id} title={`${state?.title} / Результаты`} />
			<Hero leaderboard={state?.quizLeaderboard} />

			<div className='px-4 space-y-6 sm:px-10'>
				<h2 className='text-lg font-semibold'>Результаты теста</h2>

				<div className='space-y-6'>
					{state?.quiz?.quiz?.map((item, index) => (
						<div
							key={index}
							className='flex flex-col border shadow-lg border-slate-300 mx-0 px-4 py-10 md:flex-row sm:p-10'
						>
							<QuizzesOptions item={item} index={index} />
							<QuizzesProgress item={item} leaderboard={state?.quizLeaderboard} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default MyQuizzesResult
