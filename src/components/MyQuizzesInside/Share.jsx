import React from 'react'

const Share = ({ id }) => {
	return (
		<div className='flex flex-col w-full h-full space-y-1 py-5 px-10 md:px-14'>
			<div className='space-x-3'>
				<span className='text-base'>Ссылка на тест:</span>
				<a href={`http://interactive-mod.web.app/home/quizzes/${id}`} className='text-blue-500 font-mono'>
					http://interactive-mod.web.app/home/quizzes/{id}
				</a>
			</div>
			<h3 className='text-sm text-slate-500'>Чтобы поделится тестом отправьте эту ссылку пользователю</h3>
		</div>
	)
}

export default Share
