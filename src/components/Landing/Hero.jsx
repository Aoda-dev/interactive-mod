import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Lottie from 'react-lottie-player'
import { loginWithGoogle } from '../../firebase/firebase'

import * as animationData from '../../assets/json/coder.json'

const Hero = () => {
	const { user } = useSelector((state) => state.user)
	let navigate = useNavigate()

	const signInWithGoogle = () => {
		loginWithGoogle()
	}

	return (
		<section id='Hero'>
			<div className='container flex flex-col-reverse items-center px-6 mt-10 mx-auto md:space-y-0 md:flex-row'>
				<div className='flex flex-col mb-32 space-y-12 md:w-1/2'>
					<h1 className='max-w-md text-4xl font-bold text-center mt-10 md:text-5xl md:text-left'>
						Создавайте интерактивные задания
					</h1>
					<p className='max-w-sm mx-auto text-center text-darkGrayishBlue md:text-left md:mx-0'>
						Магистерская диссертация: Разработка интерактивных модулей и методика применения их в учебном процессе.
					</p>
					<div className='flex justify-center md:justify-start'>
						{user?.uid ? (
							<button
								onClick={() => navigate('/home/dashboard')}
								className='p-3 px-6 pt-2 text-white bg-blue-500 rounded-full align-baseline hover:bg-blue-400'
							>
								Перейти в меню
							</button>
						) : (
							<button
								onClick={signInWithGoogle}
								className='p-3 px-6 pt-2 text-white bg-brightRed rounded-full align-baseline hover:bg-brightRedLight'
							>
								Начать
							</button>
						)}
					</div>
				</div>

				<div className='md:w-1/2'>
					<div className='md:-mt-40'>
						<Lottie loop play animationData={animationData} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
