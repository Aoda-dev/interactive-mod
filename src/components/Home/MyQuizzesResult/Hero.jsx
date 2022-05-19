import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const Hero = ({ leaderboard }) => {
	const [percentage, setPercentage] = useState(0)

	useEffect(() => {
		const resultArr = leaderboard.filter((item) => item.data.userScore > 70)
		const _score = Math.floor((resultArr.length / leaderboard.length) * 100)

		setPercentage(_score)
	}, [leaderboard])

	return (
		<div className='px-4 space-y-6 sm:px-10'>
			<h2 className='font-semibold text-lg'>Проходимость теста</h2>
			<div className='flex items-center py-5 px-3 sm:px-20'>
				<div className='w-44 h-44 sm:h-64 sm:w-64'>
					<CircularProgressbar value={percentage} text={`${percentage}%`} />
				</div>
			</div>
		</div>
	)
}

export default Hero
