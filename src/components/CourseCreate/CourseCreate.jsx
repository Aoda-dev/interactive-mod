import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { HumburgerMenuIcon } from '../../assets/svg/icons'
import { createCourse, setMyCourses } from '../../features/myCourses/myCourses'
import { getAllMyCoursesFromFirestore, setCourseToFirestore } from '../../firebase/firebase'
import Loader from '../Loader/Loader'
import CourseCreateModal from './CourseCreateModal'
import Navbar from './Navbar'

const CourseCreate = () => {
	const { pathname } = useLocation()
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.user)
	const { myCourses, update } = useSelector((state) => state.myCourses)

	const [loading, setLoading] = useState(true)
	const [isOpen, setIsOpen] = useState(false)
	const [navbar, setNavbar] = useState(false)

	useEffect(() => {
		getAllMyCoursesFromFirestore(user?.uid).then((res) => {
			dispatch(setMyCourses(res))
			setLoading(false)
		})
	}, [user?.uid, dispatch, update])

	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)

	const createCourseHandler = (title) => {
		const _course = {
			course: { name: title },
			creatorId: user.uid,
			creatorName: user.displayName,
			publish: false,
			createdAt: new Date().getTime(),
		}

		setCourseToFirestore(_course).then((res) => {
			dispatch(createCourse({ id: res, data: _course }))
			closeModal()
		})
	}

	return (
		<div className={`flex overflow-hidden h-screen ${loading && 'justify-center items-center'}`}>
			{loading && <Loader className='w-1/2' />}

			{!loading && (
				<>
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
				</>
			)}
		</div>
	)
}

export default CourseCreate
