import React from 'react'

const QuizzesOptions = ({ item, index }) => {
	return (
		<div className='w-full space-y-3 md:w-1/2'>
			<h3 className='text-gray-400'>Вопрос {index + 1}</h3>
			<p className='font-bold'>{item?.questionText}</p>

			<div className='flex flex-col py-5'>
				{item?.answersOptions.map((answer, _index) => (
					<div key={_index} className='flex'>
						<div
							className={`text-left border-r border-r-slate-400 ${
								answer?.isCorrect ? 'text-green-400' : 'text-gray-400'
							} w-[10%] sm:text-center`}
						>
							{_index === 0 && 'A'}
							{_index === 1 && 'B'}
							{_index === 2 && 'C'}
							{_index === 3 && 'D'}
						</div>
						<div className={`ml-4 pb-2 ${answer?.isCorrect ? 'text-green-400' : 'text-gray-400'} w-[90%]`}>
							{answer?.answerText}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default QuizzesOptions
