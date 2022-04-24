import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PlayButtonIcon } from '../../assets/svg/icons'

const Hero = ({ id, img, title, quiz, creatorName, creatorImg, description, timer = '', quizLength }) => {
	let navigate = useNavigate()
	const [time, setTime] = useState('')
	const { placeholderLoading } = useSelector((state) => state.myQuizzes)

	useEffect(() => {
		const [minutes, seconds] = timer?.split(':')

		if (minutes > 0) {
			setTime('Минуты')
		} else {
			setTime('Секунды')
		}
	}, [timer])

	const playQuiz = () => {
		navigate(`/quiz/${id}`, {
			state: {
				id: id,
				quiz: quiz,
			},
		})
	}

	return (
		<div className='w-full h-full relative'>
			<div className='flex flex-col w-full h-full relative py-10 px-10 space-y-12 md:flex-row md:space-x-12 md:space-y-0'>
				<div
					data-placeholder={placeholderLoading ? true : false}
					className='relative overflow-hidden w-full h-64 shadow-2xl shadow-indigo-300 bg-gray-200'
				>
					<img className='w-full h-full object-cover' src={img} />
				</div>

				<div className='flex flex-col justify-center w-full space-y-2'>
					<div className='flex items-center'>
						<span className='text-sm mr-3'>Создатель:</span>
						<img className='w-5 h-5 rounded-full mr-1' src={creatorImg} />
						<a href='#' alt='' className='text-sm underline underline-offset-1'>
							{creatorName}
						</a>
					</div>
					<h2 className='font-bold text-2xl'>{title}</h2>
					<p className='pt-2 font-light'>{description}</p>
				</div>
				<div className='flex flex-col justify-center items-start space-y-3 md:w-full md:items-end'>
					<div className='space-x-3'>
						<span className='text-sm'>{quizLength} вопроса</span>
						<span className='text-sm'>
							{timer} {time}
						</span>
					</div>
					<div>
						<button onClick={playQuiz} className='flex items-center bg-indigo-500 py-2 px-4 space-x-2 rounded-full'>
							<PlayButtonIcon className='h-5 w-5 fill-white' />
							<span className='text-white -mt-0.5'>Играть</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero
