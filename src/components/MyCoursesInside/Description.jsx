import React from 'react'

const Description = ({ description }) => {
	return (
		<div className='space-y-6 p-10 sm:p-14'>
			<div className='flex flex-col space-y-5'>
				<h2 className='text-2xl font-bold'>Описание</h2>

				<div className='space-y-3 text-sm text-gray-500'>
					<p>{description}</p>
				</div>
			</div>
		</div>
	)
}

export default Description
