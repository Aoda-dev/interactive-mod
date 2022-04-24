import React, { useState } from 'react'

const QuizAnswers = ({ selectAnswer, options }) => {
	const [value, setValue] = useState(null)

	return (
		<div className='space-y-3 text-black'>
			{options.map((item, index) => {
				return (
					<div key={item?.id} className='flex bg-white border-2 rounded-lg px-5 py-3'>
						<div>
							<input
								onChange={(e) =>
									setValue({
										id: item?.id,
										text: item?.answerText,
										isCorrect: item?.isCorrect,
									})
								}
								checked={item?.id === value?.id}
								type='checkbox'
								className='h-4 w-4 border mt-1 border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none cursor-pointer'
							/>
						</div>
						<div className='w-full break-words px-5 text-sm text-gray-600'>{item?.answerText}</div>
					</div>
				)
			})}

			<div className='w-full flex justify-end'>
				<button
					onClick={(e) => {
						selectAnswer(value?.text, value?.id, value?.isCorrect)
						setValue(null)
					}}
					className='px-5 mt-2 py-3 bg-gray-600 text-white text-sm'
				>
					Cледующий Вопрос
				</button>
			</div>
		</div>
	)
}

export default QuizAnswers
