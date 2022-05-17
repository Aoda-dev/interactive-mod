import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllMyCoursesFromFirestore } from '../../../firebase/firebase'
import Loader from '../../Loader/Loader'
import MyCoursesAllCourses from './MyCoursesAllCourses'

const MyCourses = () => {
	const { user } = useSelector((state) => state.user)
	const [loading, setLoading] = useState(true)
	const [myCourses, setMyCourses] = useState([])

	useEffect(() => {
		getAllMyCoursesFromFirestore(user?.uid).then((res) => {
			setMyCourses(res)
			setLoading(false)
		})
	}, [user?.uid])

	return (
		<div className='w-full relative px-10 pb-7 md:px-10'>
			{loading && <Loader className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2' />}

			{!loading && <MyCoursesAllCourses myCourses={myCourses} />}
		</div>
	)
}

export default MyCourses
