import React, { useState, useEffect } from 'react'

const QuizzesProgress = ({ item, leaderboard }) => {
	// const width = '90%'
	const [stats, setStats] = useState([
		{ id: 0, title: 'A', progress: 100, isTrue: false },
		{ id: 1, title: 'B', progress: 29, isTrue: false },
		{ id: 2, title: 'C', progress: 65, isTrue: true },
		{ id: 3, title: 'D', progress: 50, isTrue: false },
	])

	// TODO: PROGRESS BAR

	return (
		<div className='w-full flex md:w-1/2'>
			<div className='flex flex-col px-3 text-gray-400 space-y-4 mt-1.5'>
				{stats.map((stat) => (
					<span key={stat.id} className={`${stat.isTrue ? 'text-green-400' : 'text-gray-400'}`}>
						{stat.title}
					</span>
				))}
			</div>

			<div className='flex flex-col w-full px-0 space-y-2 text-gray-600'>
				{stats.map((stat) => (
					<div key={stat.id} className='w-full flex items-center'>
						<div className='w-full h-8'>
							<div
								style={{ width: `${stat.progress}%` }}
								className={`h-full ${stat.isTrue ? 'bg-green-400' : 'bg-gray-200'} border border-slate-400`}
							></div>
						</div>
						<span className='mx-2 w-5'>{stat.progress}%</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default QuizzesProgress
