import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { createCourse, setMyCourses } from '../../features/myCourses/myCourses'
import CourseCreateModal from './CourseCreateModal'
import Navbar from './Navbar'

const CourseCreate = () => {
	const { pathname } = useLocation()
	const dispatch = useDispatch()
	const { myCourses } = useSelector((state) => state.myCourses)

	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (localStorage.getItem('myCourses')) {
			dispatch(setMyCourses(JSON.parse(localStorage.getItem('myCourses'))))
		}
	}, [])

	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)

	const createCourseHandler = (title) => {
		dispatch(createCourse(title))
		closeModal()
	}

	return (
		<div className='flex overflow-hidden h-screen'>
			<CourseCreateModal closeModal={closeModal} isOpen={isOpen} createCourseHandler={createCourseHandler} />

			<Navbar openModal={openModal} myCourses={myCourses} />

			<div className='w-full h-screen'>
				{pathname === '/course/create' ? (
					<div className='w-full h-screen flex justify-center items-center'>
						<span className='text-xl text-gray-500'>Создайте или выберите курс</span>
					</div>
				) : (
					<Outlet />
				)}
			</div>
		</div>
	)
}

export default CourseCreate
