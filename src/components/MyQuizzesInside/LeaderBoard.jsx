import React from 'react'
import { useSelector } from 'react-redux'

const LeaderBoard = ({ quizLeaderboard }) => {
	const { user } = useSelector((state) => state.user)

	return (
		<div className='flex flex-col w-full h-full mt-10 p-10 space-y-6'>
			<h2 className='font-semibold text-2xl'>Таблица лидеров</h2>

			{!quizLeaderboard.length > 0 && <h3 className='mx-auto pt-5'>Еще никто не прошел тест</h3>}

			{quizLeaderboard.length > 0 && (
				<table>
					<thead>
						<tr>
							<th className='border-b border-b-slate-400 text-left px-0 py-4 sm:px-8'>Участники</th>
							<th className='border-b border-b-slate-400 text-left px-0 py-4 sm:px-8'>Результат</th>
							<th className='border-b border-b-slate-400 text-left px-0 py-4 sm:px-8'>Время</th>
						</tr>
					</thead>
					<tbody>
						{quizLeaderboard.map((item) => (
							<tr
								key={item?.id}
								className={`border-b border-b-slate-200 ${
									item?.data?.userId === user?.uid && 'bg-slate-100'
								} cursor-pointer hover:bg-slate-100`}
							>
								<td className='px-0 py-4 sm:px-8'>
									<div className='flex items-center space-x-3'>
										<img
											className='w-10 h-10 rounded-full object-cover border border-slate-500'
											src={item?.data?.userPhotoURL}
										/>
										<span>{item?.data?.userDisplayName}</span>
									</div>
								</td>
								<td className='px-0 py-4 sm:px-8'>{item?.data?.userScore}%</td>
								<td className='px-0 py-4 sm:px-8'>
									{item?.data?.userFinishedTime?.minutes}:
									{item?.data?.userFinishedTime?.seconds < 10
										? `0${item?.data?.userFinishedTime?.seconds}`
										: item?.data?.userFinishedTime?.seconds}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default LeaderBoard
