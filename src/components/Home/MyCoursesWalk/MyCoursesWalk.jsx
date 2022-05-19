import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getAllMyCoursesSectionsFromFirestore, getOneCourse } from '../../../firebase/firebase'

import Courses from './Courses'
import Header from './Header'
import Hero from './Hero'

const MyCoursesWalk = () => {
	const [course, setCourse] = useState({})
	const [sections, setSection] = useState([])
	const { id } = useParams()

	useEffect(() => {
		getOneCourse(id).then((res) => {
			if (res) {
				getAllMyCoursesSectionsFromFirestore(id).then((result) => {
					const sortedActivities = result.slice().sort((a, b) => a.data.createdAt - b.data.createdAt)

					setCourse(res)
					setSection(sortedActivities)
				})
			}
		})
	}, [id])

	return (
		<div className='w-full relative px-0 pb-20 md:px-0'>
			<Header title={course?.course?.name} />
			<Hero />
			<Courses courseId={id} sections={sections} />
		</div>
	)
}

export default MyCoursesWalk
