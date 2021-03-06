import React from 'react'

const CourseContent = ({ sections }) => {
	return (
		<div className='space-y-6 px-10 sm:px-14'>
			<h2 className='text-2xl font-bold'>Контент курса</h2>

			<div className='w-full p-0 bg-white space-y-3 rounded-2xl md:p-2'>
				{sections?.map((section, index) => (
					<div key={section?.id} className='font-semibold border-b border-b-gray-400 space-x-3 text-black px-5 py-2'>
						<span>{index + 1}.</span>
						<span>{section?.data?.name}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default CourseContent
