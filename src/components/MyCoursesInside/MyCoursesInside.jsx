import React from 'react'
import CourseContent from './CourseContent'

import Description from './Description'
import Header from './Header'

const MyCoursesInside = () => {
	return (
		<div className='w-full px-0 pb-20 md:px-0'>
			<Header />
			<Description />
			<CourseContent />
		</div>
	)
}

export default MyCoursesInside
