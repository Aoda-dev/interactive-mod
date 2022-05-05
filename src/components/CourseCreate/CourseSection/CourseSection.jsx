import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArrowNarrowLeft } from '../../../assets/svg/icons'
import DropDownMenu from './DropDownMenu'

// TODO: add links button and pptx files and something

const CourseSection = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const location = useLocation()
	const mySections = useSelector(
		(state) =>
			state.myCourses.myCourses
				.filter((d) => d.id === location.state.courseId)[0]
				?.sections?.filter((d) => d.id === id)[0]
	)

	const [videoLink, setVideoLink] = useState('')
	const [content, setContent] = useState('')
	const [links, setLinks] = useState('')

	useEffect(() => {
		if (!mySections) navigate('/course/create')
	}, [mySections])

	const addMaterials = () => {}

	return (
		<div className='w-full h-full bg-white overflow-y-scroll'>
			<div className='border shadow-lg flex items-center space-x-6 m-5 px-5 py-2'>
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
						value={videoLink}
						onChange={(e) => setVideoLink(e.target.value)}
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
								value={content}
								onChange={(e) => setContent(e.target.value)}
								className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
								id='exampleFormControlTextarea1'
								rows='3'
								placeholder='Ваш контент'
							></textarea>
						</div>
					</div>
				</div>
			</div>

			<div className='mx-5 my-10 px-5 py-2 space-y-3'>
				<div className='flex justify-between items-center'>
					<div>
						<h2 className='text-xl'>Дополнительные материалы</h2>
						<p className='text-sm text-gray-500'>Нажмите на + чтобы добавить дополнительные материалы</p>
					</div>
					<DropDownMenu />
				</div>

				<div className='border bg-white shadow-lg px-5 py-5 space-x-3'>asdasda</div>
			</div>
		</div>
	)
}

export default CourseSection
