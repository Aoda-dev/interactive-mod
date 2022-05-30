import React from 'react'
import Lottie from 'react-lottie-player'

import moonWalking from '../../assets/json/moon-walking.json'
import rocketJson from '../../assets/json/rocket.json'

const QuizHowToPlay = ({ setStartQuiz }) => {
	return (
		<div className='container mx-auto p-10 mt-20 bg-white border border-slate-300 shadow-lg xl:max-w-screen-lg text-black'>
			<h1 className='text-center text-4xl font-light'>Как играть в игру</h1>

			<p className='my-8'>Прочитай сначала до конца</p>

			<div className='space-y-12'>
				<div className='flex justify-between mx-10 pb-12'>
					<div className='space-y-6 text-sm'>
						<ul className='list-disc space-y-2 md:space-y-0'>
							<li>У игры есть таймер, постарайтесь ответить на все вопросы до окончания времени.</li>
							<li>В игре могут быть до 25 вопросов.</li>
							<li>Каждый вопрос имеет 4 ответа.</li>
						</ul>

						<ul className='list-disc space-y-2 md:space-y-0'>
							<li>У игры есть таймер, постарайтесь ответить на все вопросы до окончания времени.</li>
							<li>В игре могут быть до 25 вопросов.</li>
							<li>Каждый вопрос имеет 4 ответа.</li>
						</ul>
					</div>
					<div className='hidden w-56 -mt-7 lg:block'>
						<Lottie play loop animationData={moonWalking} />
					</div>
				</div>

				<button onClick={() => setStartQuiz(true)} className='px-5 py-2 block bg-indigo-600 text-white mx-auto'>
					Начать
				</button>
			</div>
		</div>
	)
}

export default QuizHowToPlay
