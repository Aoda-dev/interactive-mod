import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArrowNarrowLeft, CourseSectionDeleteIcon } from '../../../assets/svg/icons'
import { createContent, createLink, createVideoLink, deleteLink } from '../../../features/myCourses/myCourses'
import CourseSectionModal from './CourseSectionModal'
import DropDownMenu from './DropDownMenu'

// TODO: add links button and pptx files and something

const CourseSection = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { id } = useParams()
	const location = useLocation()
	const mySections = useSelector(
		(state) =>
			state.myCourses.myCourses
				.filter((d) => d.id === location.state.courseId)[0]
				?.sections?.filter((d) => d.id === id)[0]
	)

	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (!mySections) navigate('/course/create')
	}, [mySections])

	const createVideoLinkHandler = (e) => {
		dispatch(createVideoLink({ myCourseId: location.state.courseId, mySectionId: mySections.id, name: e.target.value }))
	}

	const createContentHandler = (e) => {
		dispatch(createContent({ myCourseId: location.state.courseId, mySectionId: mySections.id, name: e.target.value }))
	}

	const createLinkHandler = (title, link) => {
		dispatch(createLink({ myCourseId: location.state.courseId, mySectionId: mySections.id, name: title, link: link }))
	}

	const deleteLinkHandler = (id) => {
		dispatch(deleteLink({ myCourseId: location.state.courseId, mySectionId: mySections.id, linkId: id }))
	}

	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)

	return (
		<div className='w-full h-full bg-white overflow-y-scroll'>
			<div className='border flex items-center space-x-3 shadow-lg m-5 px-5 py-2'>
				<ArrowNarrowLeft onClick={() => navigate(-1)} className='w-8 h-8 cursor-pointer' />
				<h2 className='text-2xl'>{mySections?.name}</h2>
			</div>

			<div className='mx-5 my-10 px-5 py-2 space-y-3'>
				<h2 className='text-xl'>Видео</h2>
				<p className='text-sm text-gray-500'>
					Если у вас есть видеоролик то вставьте сюда ссылку, если же нет то просто оставтье это поле пустым
				</p>

				<div className='border flex items-center bg-white shadow-lg px-5 py-2 space-x-3'>
					<span>Ссылка:</span>
					<input
						type='text'
						value={mySections?.videoLink || ''}
						onChange={createVideoLinkHandler}
						className='w-full border-b border-b-black focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					/>
				</div>
			</div>

			<div className='mx-5 my-10 px-5 py-2 space-y-3'>
				<h2 className='text-xl'>Контент</h2>

				<div className='border bg-white shadow-lg px-5 py-2 space-x-3'>
					<div className='flex justify-center'>
						<div className='mb-3 w-full'>
							<label htmlFor='exampleFormControlTextarea1' className='form-label inline-block mb-2 text-gray-700'>
								Добавье контент
							</label>
							<textarea
								value={mySections?.content || ''}
								onChange={createContentHandler}
								className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								id='exampleFormControlTextarea1'
								rows='3'
								placeholder='Ваш контент'
							></textarea>
						</div>
					</div>
				</div>
			</div>

			<div className='mx-5 mt-10 mb-40 px-5 py-2 space-y-3'>
				<div className='flex justify-between items-center'>
					<div>
						<h2 className='text-xl'>Дополнительные материалы</h2>
						<p className='text-sm text-gray-500'>Нажмите на + чтобы добавить дополнительные материалы</p>
					</div>
					<DropDownMenu openModal={openModal} />
				</div>

				{isOpen && (
					<CourseSectionModal
						openModal={openModal}
						closeModal={closeModal}
						isOpen={isOpen}
						createLinkHandler={createLinkHandler}
					/>
				)}

				<div className='border bg-white shadow-lg px-8 py-5 space-y-2'>
					{mySections?.links?.length !== 0 && (
						<>
							<h2>Ссылки:</h2>
							{mySections?.links?.map((link) => (
								<div key={link.id} className='flex justify-between items-center'>
									<div className='space-x-2'>
										<span className='text-sm'>{link.name}</span>{' '}
										<a className='underline text-sm text-blue-500 hover:text-blue-300' href='#'>
											{link.link}
										</a>
									</div>
									<CourseSectionDeleteIcon
										onClick={() => deleteLinkHandler(link.id)}
										className='w-5 h-5 cursor-pointer hover:stroke-red-500 '
									/>
								</div>
							))}
						</>
					)}

					{mySections?.links?.length !== 0 ? null : (
						<span className='text-gray-400 text-sm'>Вы еще ничего не добавили</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default CourseSection
