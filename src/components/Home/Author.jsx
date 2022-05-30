import React from 'react'
import BossImg from '../../assets/img/Boss.jpg'

const Author = () => {
	return (
		<div className='flex flex-col p-16'>
			<div className='flex items-center space-x-6'>
				<img src={BossImg} className='aspect-square object-cover rounded-full sm:hidden' alt='Boss' />

				<div className='hidden sm:block w-[368px] h-[502px] relative'>
					<div className='absolute w-full h-full z-30'>
						<img src={BossImg} alt='Boss' className='object-fit w-full h-full' />
					</div>
					<div className='absolute w-full h-full border-4 border-slate-600 z-20 translate-x-14 translate-y-14'>2</div>
				</div>

				<div className='hidden sm:flex flex-col text-black font-bold text-4xl z-40'>
					<div className='bg-white py-5 flex flex-col text-black font-bold text-4xl z-40'>
						<span>GA</span>
						<span>NI</span>
					</div>
				</div>
			</div>

			<div className='mt-12 sm:mt-24'>
				<h2 className='text-3xl tracking-widest drop-shadow-lg'>OTEGENOV GANI</h2>
			</div>
		</div>
	)
}

export default Author
