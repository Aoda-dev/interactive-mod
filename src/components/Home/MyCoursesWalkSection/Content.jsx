import React from 'react'

const Content = ({ content }) => {
	return (
		<div className='p-10 drop-shadow-xl border-y border-y-gray-300'>
			<p className='text-gray-600'>{content}</p>
		</div>
	)
}

export default Content
