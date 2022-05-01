import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const CourseCreateModal = ({ closeModal, isOpen, createCourse }) => {
	const [title, setTitle] = useState('')
	const [error, setError] = useState(false)

	const _createCourse = () => {
		if (title.trim() === '') {
			return setError(true)
		}

		createCourse(title)

		setError(false)
		setTitle('')
	}

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as='div' className='fixed inset-0 z-10 bg-black bg-opacity-70 overflow-y-auto' onClose={closeModal}>
				<div className='min-h-screen px-4 text-center'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className='inline-block h-screen align-middle' aria-hidden='true'>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
							<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
								Введите название курса
							</Dialog.Title>
							<div className='mt-2'>
								<input
									type='text'
									placeholder='Название'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className='border-b py-2 text-sm w-full border-b-black outline-none'
								/>

								{error && <h3 className='text-sm text-red-500'>Введите название курса</h3>}
							</div>

							<div className='mt-4 space-x-2'>
								<button
									type='button'
									className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
									onClick={_createCourse}
								>
									Создать курс
								</button>
								<button
									type='button'
									className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
									onClick={closeModal}
								>
									Выйти
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}

export default CourseCreateModal
