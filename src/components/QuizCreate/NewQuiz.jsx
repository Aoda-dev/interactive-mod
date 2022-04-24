import React, { useEffect, useState } from 'react'
import { CraeteQuizXicon } from '../../assets/svg/icons'

const NewQuiz = ({ id, changeQuestion, changeQuestionTitle, index }) => {
	const [answers, setAnswers] = useState({ a: '', b: '', c: '', d: '' })
	const [title, setTitle] = useState('')
	const [userAnswer, setUserAnswer] = useState(null)

	const handleInputChange = ({ target }) => {
		setAnswers(prev => {
			return { ...prev, [target.name]: target.value }
		})
	}

	useEffect(() => {
		changeQuestionTitle(id, title)
		changeQuestion(id, answers, userAnswer)
	}, [answers, userAnswer, title])

	return (
		<div className='bg-slate-200 p-7 space-y-6 sm:px-10'>
			<div>
				<h2 className='text-2xl font-bold'>Вопрос {index + 1}</h2>
			</div>

			<div>
				<input
					value={title}
					onChange={e => setTitle(e.target.value)}
					type='text'
					placeholder='Введите вопрос'
					className='w-full text-sm p-4 outline-none text-gray-500 border border-gray-400'
				/>
			</div>

			<div className='space-y-3'>
				{Object.entries(answers).map(([key, value], index) => (
					<div key={index} className='flex items-center relative'>
						<span className='px-3 text-lg sm:px-5'>{key.toUpperCase()}</span>
						<input
							required
							value={value}
							name={key}
							onChange={handleInputChange}
							type='text'
							placeholder='Введите ответ'
							className='w-full text-sm p-3 outline-none text-gray-500 border border-gray-400'
						/>
						<div className='bg-white p-2.5 text-black border border-gray-400 cursor-pointer hover:bg-green-400 hover:text-white'>
							<CraeteQuizXicon className='h-6 w-6' />
						</div>
					</div>
				))}
			</div>
			<select
				onChange={e => setUserAnswer(e.target.value)}
				className='form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
				aria-label='Default select example'
				defaultValue='default'
			>
				<option value='default' disabled>
					Нажмите сюда чтобы выбрать правильный ответ
				</option>
				<option value='a'>A</option>
				<option value='b'>B</option>
				<option value='c'>C</option>
				<option value='d'>D</option>
			</select>
		</div>
	)
}

export default NewQuiz
