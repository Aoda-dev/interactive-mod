import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAllMyCoursesSectionsFromFirestore, getOneCourse } from '../../firebase/firebase'
import Loader from '../Loader/Loader'

import CourseContent from './CourseContent'
import Description from './Description'
import Header from './Header'

const MyCoursesInside = () => {
	const { id } = useParams()
	const [loading, setLoading] = useState(true)
	const [course, setCourse] = useState({})
	const [sections, setSections] = useState([])

	useEffect(() => {
		getOneCourse(id).then((res) => {
			getAllMyCoursesSectionsFromFirestore(id).then((result) => {
				const sortedActivities = result.slice().sort((a, b) => a.data.createdAt - b.data.createdAt)

				setSections(sortedActivities)
				setCourse(res)
				setLoading(false)
			})
		})
	}, [id])

	return (
		<div className='w-full relative px-0 pb-20 md:px-0'>
			{loading && <Loader className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2' />}

			{!loading && (
				<>
					<Header
						courseId={id}
						title={course?.course?.name}
						subTitle={course?.course?.title}
						img={course?.img}
						creatorName={course?.creatorName}
						createdAt={course?.createdAt}
					/>
					<Description description={course?.course?.aboutCourse} />
					<CourseContent sections={sections} />
				</>
			)}
		</div>
	)
}

export default MyCoursesInside
