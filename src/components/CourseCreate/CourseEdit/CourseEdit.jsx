import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { CourseCreatePlusIcon, CourseSectionDeleteIcon } from '../../../assets/svg/icons'
import { deleteCourse, setSections, updateCourseSection, updateMyCourse } from '../../../features/myCourses/myCourses'
import {
	deleteOneCourse,
	deleteOneCourseSection,
	getAllMyCoursesSectionsFromFirestore,
	setCourseSectionToFirestore,
	setImageToFirestorage,
	updateCourseToFirestore,
} from '../../../firebase/firebase'
import { uid } from '../../../helper/uniqId'

import CourseUploadModal from './CourseUploadModal'
import CreateSectionModal from './CreateSectionModal'

const CourseEdit = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { id } = useParams()
	const { updateSection } = useSelector((state) => state.myCourses)
	const myCourse = useSelector((state) => state.myCourses.myCourses.filter((d) => d.id === id)[0])
	const sections = useSelector((state) =>
		state.myCourses.sections.slice().sort((a, b) => a.data.createdAt - b.data.createdAt)
	)
	const [isOpen, setIsOpen] = useState(false)
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

	useEffect(() => {
		if (myCourse) {
			getAllMyCoursesSectionsFromFirestore(id).then((res) => {
				if (!res) return navigate('/course/create')

				dispatch(setSections(res))
			})
		} else {
			return navigate('/course/create')
		}
	}, [id, myCourse, navigate, dispatch, updateSection])

	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)
	const openUploadModal = () => setIsUploadModalOpen(true)
	const closeUploadModal = () => setIsUploadModalOpen(false)

	const uploadCourseHandler = (_data) => {
		const checkIsBase64 = _data.photoUri.split(',')
		const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

		if (base64regex.test(checkIsBase64[1])) {
			updateCourseToFirestore({
				id: _data?.id,
				data: {
					...myCourse.data,
					course: {
						...myCourse.data.course,
						title: _data.title,
						aboutCourse: _data.aboutCourse,
					},
					imgId: _data?.id,
					publish: _data.publish,
				},
			}).then(() => {
				setImageToFirestorage(_data.id, _data.photoUri).then(() => {
					dispatch(updateMyCourse())
				})
			})
		} else {
			updateCourseToFirestore({
				id: _data?.id,
				data: {
					...myCourse.data,
					course: {
						...myCourse.data.course,
						title: _data.title,
						aboutCourse: _data.aboutCourse,
					},
					publish: _data.publish,
				},
			}).then(() => {
				dispatch(updateMyCourse())
			})
		}
	}

	const deleteCourseHandler = (id) => {
		deleteOneCourse(id, myCourse?.data?.imgId).then(() => {
			dispatch(deleteCourse({ id }))
		})
	}

	const createSectionHandler = (title) => {
		setCourseSectionToFirestore({
			id: uid(),
			createdAt: new Date().getTime(),
			courseId: myCourse.id,
			name: title,
		}).then(() => {
			dispatch(updateCourseSection())
			closeModal()
		})
	}

	const deleteSectionHandler = (sectionId) => {
		deleteOneCourseSection(sectionId).then(() => {
			dispatch(updateCourseSection())
		})
	}

	return (
		<div className='w-full h-full'>
			<div className='border shadow-lg flex flex-col space-y-3 justify-between m-5 px-5 py-2 md:flex-row md:space-y-0'>
				<h2 className='text-2xl'>{myCourse?.data?.course?.name}</h2>

				<div className='space-x-0 space-y-1 sm:space-x-2'>
					<button
						onClick={() => openUploadModal()}
						className='bg-blue-500 w-full text-white py-2 px-3 text-sm sm:w-fit'
					>
						Загрузить курс
					</button>
					<button
						onClick={() => deleteCourseHandler(id)}
						className='bg-red-500 w-full text-white py-2 px-3 text-sm sm:w-fit'
					>
						Удалить курс
					</button>
				</div>
			</div>

			{sections?.length > 0 && (
				<div className='h-full py-5 px-10 space-y-3'>
					<h2 className='text-xl'>Разделы:</h2>

					{sections?.map((section, index) => (
						<div
							onClick={() => navigate(`/course/create/edit/${id}/${section.id}`, { state: { courseId: id } })}
							key={section.id}
							className='bg-white shadow-md border flex items-center justify-between border-slate-300 px-5 py-2 cursor-pointer hover:bg-gray-100'
						>
							<div>
								{index + 1}. {section?.data?.name}
							</div>
							<button
								onClick={(e) => {
									e.stopPropagation()
									deleteSectionHandler(section.id)
								}}
							>
								<CourseSectionDeleteIcon className='h-6 w-6 hover:stroke-red-500' />
							</button>
						</div>
					))}

					<button onClick={openModal} className='bg-blue-500 text-white px-5 py-2 mx-auto block'>
						Создать новый раздел
					</button>
				</div>
			)}
			{sections?.length === 0 && (
				<div className='bg-slate-100 text-gray-800 flex items-center justify-center h-full'>
					<div className='-mt-64 flex items-center flex-col justify-center md:-mt-28 px-5'>
						<CourseCreatePlusIcon onClick={openModal} className='h-1/3 w-1/3 fill-gray-500 cursor-pointer' />
						<h2 className='text-gray-500 text-center text-sm sm:text-base'>
							Вы еще не создали раздел, нажмите на + что бы создать раздел.
						</h2>
					</div>
				</div>
			)}
			{isOpen && (
				<CreateSectionModal closeModal={closeModal} isOpen={isOpen} createSectionHandler={createSectionHandler} />
			)}
			{isUploadModalOpen && (
				<CourseUploadModal
					myCourse={myCourse}
					uploadCourseHandler={uploadCourseHandler}
					closeUploadModal={closeUploadModal}
					isUploadModalOpen={isUploadModalOpen}
				/>
			)}
		</div>
	)
}

export default CourseEdit
