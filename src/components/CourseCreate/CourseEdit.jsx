// TODO: REDIRECT HERE []
// TODO: IM HERE STOPPED VOOBSHEM IDEA JANA PIZDEC BOLGAN ESINE TUSETN SHGAR

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CourseCreatePlusIcon } from '../../assets/svg/icons'
import CreateSectionModal from './CreateSectionModal'

const CourseEdit = () => {
	const { id } = useParams()
	const [sections, setSections] = useState([])
	const [isOpen, setIsOpen] = useState(false)

	const closeModal = () => {
		setIsOpen(false)
	}

	const openModal = () => {
		setIsOpen(true)
	}

	const createSection = (title) => {
		setSections((prev) => [...prev, { id: sections.length, name: title }])
		closeModal()
	}

	return (
		<div className='w-full h-full'>
			<div className='border shadow-lg flex justify-between m-5 px-5 py-2'>
				<h2 className='text-2xl'>{id}</h2>

				<div className='space-x-2'>
					<button className='bg-blue-500 text-white py-2 px-3 text-sm'>Загрузить курс</button>
					<button className='bg-red-500 text-white py-2 px-3 text-sm'>Удалить курс</button>
				</div>
			</div>

			{sections.length > 0 && (
				<div className='bg-slate-100 h-full py-5 px-10 space-y-3'>
					<h2 className='text-xl'>Разделы:</h2>

					{sections.map((section) => (
						<div key={section.id} className='bg-white shadow-md border border-slate-300 px-5 py-2 cursor-pointer'>
							{section.id + 1}. {section.name}
						</div>
					))}

					<button onClick={openModal} className='bg-blue-500 text-white px-5 py-2 mx-auto block'>
						Создать новый раздел
					</button>
				</div>
			)}

			{sections.length === 0 && (
				<div className='bg-slate-100 text-gray-800 flex items-center justify-center h-full'>
					<div className='-mt-28 flex items-center flex-col justify-center'>
						<CourseCreatePlusIcon onClick={openModal} className='h-32 w-32 fill-gray-500 cursor-pointer' />
						<h2 className='text-gray-500'>Вы еще не создали раздел, нажмите на + что бы создать раздел.</h2>
					</div>
				</div>
			)}

			{isOpen && <CreateSectionModal closeModal={closeModal} isOpen={isOpen} createSection={createSection} />}
		</div>
	)
}

export default CourseEdit
