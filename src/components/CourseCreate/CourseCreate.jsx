import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import CourseCreateModal from './CourseCreateModal'
import Navbar from './Navbar'

const CourseCreate = () => {
	const { pathname } = useLocation()
	const [courses, setCourses] = useState([])

	const [isOpen, setIsOpen] = useState(false)

	const closeModal = () => {
		setIsOpen(false)
	}

	const openModal = () => {
		setIsOpen(true)
	}

	const createCourse = (title) => {
		setCourses((prev) => [...prev, { id: courses.length, name: title }])
		closeModal()
	}

	return (
		<div className='flex overflow-hidden h-screen'>
			<CourseCreateModal closeModal={closeModal} isOpen={isOpen} createCourse={createCourse} />

			<Navbar openModal={openModal} courses={courses} />

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
