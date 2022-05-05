// TODO: REDIRECT HERE []
// TODO: IM HERE STOPPED VOOBSHEM IDEA JANA PIZDEC BOLGAN ESINE TUSETN SHGAR

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { CourseCreatePlusIcon, CourseSectionDeleteIcon } from '../../../assets/svg/icons'
import { createSection, deleteCourse, deleteSection } from '../../../features/myCourses/myCourses'
import CreateSectionModal from './CreateSectionModal'

const CourseEdit = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { id } = useParams()
	const { state } = useLocation()
	const myCourse = useSelector((state) => state.myCourses.myCourses.filter((d) => d.id === id)[0])
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (!myCourse) navigate('/course/create')
	}, [myCourse])

	const closeModal = () => {
		setIsOpen(false)
	}

	const openModal = () => {
		setIsOpen(true)
	}

	const createSectionHandler = (title) => {
		dispatch(createSection({ title, id: state.id }))
		closeModal()
	}

	const deleteSectionHandler = (courseId, sectionId) => {
		dispatch(deleteSection({ courseId, sectionId }))
	}

	const deleteCourseHandler = (id) => {
		dispatch(deleteCourse({ id }))
	}

	return (
		<div className='w-full h-full'>
			<div className='border shadow-lg flex justify-between m-5 px-5 py-2'>
				<h2 className='text-2xl'>{myCourse?.name}</h2>

				<div className='space-x-2'>
					<button className='bg-blue-500 text-white py-2 px-3 text-sm'>Загрузить Курс</button>
					<button onClick={() => deleteCourseHandler(id)} className='bg-red-500 text-white py-2 px-3 text-sm'>
						Удалить курс
					</button>
				</div>
			</div>

			{myCourse?.sections.length > 0 && (
				<div className='h-full py-5 px-10 space-y-3'>
					<h2 className='text-xl'>Разделы:</h2>

					{myCourse?.sections.map((section, index) => (
						<div
							onClick={() => navigate(`/course/create/edit/${id}/${section.id}`, { state: { courseId: id } })}
							key={section.id}
							className='bg-white shadow-md border flex items-center justify-between border-slate-300 px-5 py-2 cursor-pointer hover:bg-gray-100'
						>
							<div>
								{index + 1}. {section.name}
							</div>
							<button
								onClick={(e) => {
									e.stopPropagation()
									deleteSectionHandler(id, section.id)
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

			{myCourse?.sections.length === 0 && (
				<div className='bg-slate-100 text-gray-800 flex items-center justify-center h-full'>
					<div className='-mt-28 flex items-center flex-col justify-center'>
						<CourseCreatePlusIcon onClick={openModal} className='h-32 w-32 fill-gray-500 cursor-pointer' />
						<h2 className='text-gray-500'>Вы еще не создали раздел, нажмите на + что бы создать раздел.</h2>
					</div>
				</div>
			)}

			{isOpen && (
				<CreateSectionModal closeModal={closeModal} isOpen={isOpen} createSectionHandler={createSectionHandler} />
			)}
		</div>
	)
}

export default CourseEdit
