import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { HumburgerMenuIcon } from '../../assets/svg/icons'
import { createCourse, setMyCourses } from '../../features/myCourses/myCourses'
import CourseCreateModal from './CourseCreateModal'
import Navbar from './Navbar'

const CourseCreate = () => {
	const { pathname } = useLocation()
	const dispatch = useDispatch()
	const { myCourses } = useSelector((state) => state.myCourses)

	const [isOpen, setIsOpen] = useState(false)
	const [navbar, setNavbar] = useState(false)

	useEffect(() => {
		if (localStorage.getItem('myCourses')) {
			dispatch(setMyCourses(JSON.parse(localStorage.getItem('myCourses'))))
		}
	}, [dispatch])

	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)

	const createCourseHandler = (title) => {
		dispatch(createCourse(title))
		closeModal()
	}

	return (
		<div className='flex overflow-hidden h-screen'>
			<CourseCreateModal closeModal={closeModal} isOpen={isOpen} createCourseHandler={createCourseHandler} />
			<Navbar navbar={navbar} setNavbar={setNavbar} openModal={openModal} myCourses={myCourses} />

			<div className='w-full h-screen'>
				{pathname === '/course/create' ? (
					<div className='w-full h-screen relative flex justify-center items-center'>
						<HumburgerMenuIcon
							onClick={() => setNavbar(false)}
							className='fixed top-5 right-5 w-8 h-8 cursor-pointer sm:hidden'
						/>
						<span className='text-xl text-gray-500'>Создайте или выберите курс</span>
					</div>
				) : (
					<div className='w-full h-full relative space-y-16 sm:space-y-0'>
						<HumburgerMenuIcon
							onClick={() => setNavbar(false)}
							className='fixed top-5 right-5 w-8 h-8 cursor-pointer sm:hidden'
						/>
						<Outlet />
					</div>
				)}
			</div>
		</div>
	)
}

export default CourseCreate
