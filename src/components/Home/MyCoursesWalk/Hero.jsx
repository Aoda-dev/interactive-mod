// TODO: remake hero component
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'
import { DownloadFileIcon } from '../../../assets/svg/icons'

const Hero = () => {
	const percentage = 80

	return (
		<div className='flex flex-col px-10 p-5 space-y-6 md:flex-row md:space-y-0'>
			<div className='flex-1 space-y-3 flex flex-col items-center'>
				<div className='w-56 h-56'>
					<CircularProgressbar value={percentage} text={`${percentage}%`} />
				</div>
				<h2 className='text-lg'>Вы прошли курс на {percentage}%</h2>
			</div>
			<div className='flex-1 space-y-3'>
				<h2 className='font-semibold'>Дополнительные материалы курса</h2>

				<ul className='space-y-2'>
					<li className='flex justify-between hover:text-gray-400'>
						<span>Lorem ipsum dolor sit amet.</span>
						<DownloadFileIcon className='cursor-pointer h-5 w-5' />
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Hero
