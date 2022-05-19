import React from 'react'
import { useNavigate } from 'react-router-dom'

const Courses = ({ courseId, sections }) => {
	let navigate = useNavigate()

	return (
		<div className='p-10 space-y-6'>
			<h3 className='text-lg'>Секций:</h3>

			<div className='space-y-3'>
				{sections?.map((section, index) => (
					<div
						onClick={() => navigate(`/home/courses/${courseId}/walk/${section.id}`)}
						key={section.id}
						className='px-5 py-2 bg-indigo-500 text-white cursor-pointer hover:bg-indigo-400'
					>
						{index + 1}. {section?.data?.name}
					</div>
				))}
			</div>
		</div>
	)
}

export default Courses
