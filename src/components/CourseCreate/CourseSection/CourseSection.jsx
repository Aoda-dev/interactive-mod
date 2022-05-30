import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowNarrowLeft, CourseSectionDeleteIcon, DownloadFileIcon } from '../../../assets/svg/icons'
import { createContent, createLink, createVideoLink, deleteLink } from '../../../features/myCourses/myCourses'
import {
	deleteOneDocumentFromFirestore,
	getAllMyDocuments,
	setDocumentToFirestorage,
	setDocumentToFirestore,
	updateCourseSectionToFirestore,
} from '../../../firebase/firebase'
import { uid } from '../../../helper/uniqId'
import CourseSectionModal from './CourseSectionModal'
import DropDownMenu from './DropDownMenu'

const CourseSection = () => {
	const aRef = useRef()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { id } = useParams()
	const mySections = useSelector((state) => state.myCourses.sections.filter((d) => d.id === id)[0])

	const [documents, setDocuments] = useState([])
	const [type, setType] = useState(null)
	const [isSaving, setIsSaving] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [update, setUpdate] = useState(false)

	useEffect(() => {
		if (!mySections) navigate('/course/create')

		getAllMyDocuments(id).then((res) => {
			setDocuments(res)
		})
	}, [mySections, navigate, update, id])

	const saveHandler = () => {
		setIsSaving(true)

		updateCourseSectionToFirestore(mySections).then((res) => {
			setTimeout(() => {
				setIsSaving(false)
			}, 2000)
		})
	}

	const createVideoLinkHandler = (e) => {
		dispatch(createVideoLink({ id: mySections.id, name: e.target.value }))
	}

	const createContentHandler = (e) => {
		dispatch(createContent({ id: mySections.id, name: e.target.value }))
	}

	const createLinkHandler = (title, link) => {
		dispatch(createLink({ id: mySections.id, name: title, link: link }))
	}

	const deleteLinkHandler = (id) => {
		dispatch(deleteLink({ id: mySections.id, linkId: id }))
	}

	const createDocumentHandler = (title, document) => {
		const uniqId = uid()
		const newDocument = {
			id: uniqId,
			name: title,
			sectionId: id,
			fileName: document.name,
		}

		setDocumentToFirestore(newDocument).then((res) => {
			setDocumentToFirestorage(uniqId, document).then(() => {
				setUpdate((prev) => !prev)
			})
		})
	}

	const deleteDocumentHandler = (id, documentId) => {
		deleteOneDocumentFromFirestore(id, documentId).then(() => setUpdate((prev) => !prev))
	}

	const downloadFileHandler = (file, fileName) => {
		aRef.current.href = URL.createObjectURL(file)
		aRef.current.download = fileName
		aRef.current.click()
	}

	const closeModal = () => setIsOpen(false)

	const openModal = (_type) => {
		setType(_type)
		setIsOpen(true)
	}

	return (
		<div className='w-full h-full bg-white overflow-y-scroll'>
			<div className='border flex flex-col space-y-3 justify-between shadow-lg m-5 px-5 py-2 sm:flex-row sm:space-y-0'>
				<div className='flex items-center space-x-3'>
					<ArrowNarrowLeft onClick={() => navigate(-1)} className='w-8 h-8 cursor-pointer' />
					<h2 className='text-2xl'>{mySections?.data?.name}</h2>
				</div>

				<button
					onClick={saveHandler}
					disabled={isSaving}
					className={`text-xs transition-all px-5 py-2 ${
						isSaving ? 'bg-green-500' : 'bg-blue-500'
					} text-white sm:text-base`}
				>
					{isSaving ? 'Сохранено' : 'Сохранить'}
				</button>
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
						value={mySections?.data?.videoLink || ''}
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
								Добавьте контент
							</label>
							<textarea
								value={mySections?.data?.content || ''}
								onChange={createContentHandler}
								className='h-60 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
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
						type={type}
						openModal={openModal}
						closeModal={closeModal}
						isOpen={isOpen}
						createDocumentHandler={createDocumentHandler}
						createLinkHandler={createLinkHandler}
					/>
				)}

				{mySections?.data?.links?.length !== 0 && (
					<div className='border bg-white shadow-lg px-8 py-5 space-y-2'>
						{mySections?.data?.links?.map((link) => (
							<div key={link.id} className='flex justify-between items-center'>
								<div className='space-x-2 flex-1'>
									<a
										href={link.link}
										rel='noreferrer'
										target='_blank'
										className='underline text-sm text-blue-500 hover:text-blue-300'
									>
										{link.name}
									</a>
								</div>
								<CourseSectionDeleteIcon
									onClick={() => deleteLinkHandler(link.id)}
									className='w-5 h-5 cursor-pointer hover:stroke-red-500 '
								/>
							</div>
						))}

						{documents?.map((document) => (
							<div key={document.id} className='flex justify-between items-center'>
								<div className='space-x-2 flex-1'>
									<span className='text-sm'>{document?.data.name}</span>
									<span className='text-sm'>{document?.data.fileName}</span>
									<a
										ref={aRef}
										href='/hidden'
										className='hidden underline text-sm text-blue-500 hover:text-blue-300'
									></a>
								</div>
								<div className='flex items-center space-x-3'>
									<DownloadFileIcon
										onClick={() => downloadFileHandler(document?.data?.document, document?.data?.fileName)}
										className='w-5 h-5 cursor-pointer hover:stroke-blue-500 '
									/>
									<CourseSectionDeleteIcon
										onClick={() => deleteDocumentHandler(document.id, document?.data.id)}
										className='w-5 h-5 cursor-pointer hover:stroke-red-500 '
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default CourseSection
