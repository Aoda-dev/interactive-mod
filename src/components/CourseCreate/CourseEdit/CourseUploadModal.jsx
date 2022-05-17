import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const fileToDataUri = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (event) => {
			resolve(event.target.result)
		}
		reader.readAsDataURL(file)
	})

const CreateSectionModal = ({ closeUploadModal, isUploadModalOpen, uploadCourseHandler }) => {
	const [title, setTitle] = useState('')
	const [aboutCourse, setAboutCourse] = useState('')
	const [photoUri, setPhotoUri] = useState('')
	const [error, setError] = useState(false)

	const handleUploadImg = (e) => {
		let pattern = /image-*/

		if (!e.target.files[0].type.match(pattern)) return alert('Invalid format')

		if (!e.target.files[0]) return setPhotoUri('')

		fileToDataUri(e.target.files[0]).then((dataUri) => {
			setPhotoUri(dataUri)
		})
	}

	const _uploadSection = () => {
		if (title.trim() === '' || photoUri.trim() === '' || aboutCourse.trim() === '') return setError(true)

		uploadCourseHandler({ title: title, photoUri: photoUri, aboutCourse: aboutCourse })

		setError(false)
		closeUploadModal()
		setTitle('')
		setPhotoUri('')
		setAboutCourse('')
	}

	return (
		<Transition appear show={isUploadModalOpen} as={Fragment}>
			<Dialog as='div' className='fixed inset-0 z-10 bg-black bg-opacity-70 overflow-y-auto' onClose={closeUploadModal}>
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
						<div className='inline-block space-y-6 w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
							<Dialog.Title as='h3' className='text-xl font-medium leading-6 text-gray-900'>
								Загрузка курса 🚀
							</Dialog.Title>
							<div className='mt-2'>
								<div className='space-y-3 flex flex-col'>
									<span className='text-lg text-gray-600'>Выберите постер курса</span>
									{photoUri && <img src={photoUri} alt='' />}
									<input type='file' name='quizPic' accept='image/*' onChange={handleUploadImg} />
								</div>
							</div>

							<div className='flex flex-col'>
								<span className='text-lg text-gray-600'>Заголовок курса</span>
								<input
									type='text'
									value={title}
									placeholder='Введите заголовок курса'
									onChange={(e) => setTitle(e.target.value)}
									className='border-b py-2 border-slate-500 outline-none'
								/>
							</div>

							<div className='mb-3 w-full'>
								<label
									htmlFor='exampleFormControlTextarea1'
									className='form-label inline-block mb-2 text-lg text-gray-700'
								>
									Описание курса
								</label>
								<textarea
									value={aboutCourse}
									onChange={(e) => setAboutCourse(e.target.value)}
									className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
									id='exampleFormControlTextarea1'
									rows='3'
									placeholder='Описание'
								></textarea>
							</div>
							{error && <h3 className='text-md text-red-500 animate-bounce'>Заполните все поля</h3>}

							<div className='mt-4 space-x-2'>
								<button
									type='button'
									className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400'
									onClick={_uploadSection}
								>
									Загрузить курс
								</button>
								<button
									type='button'
									className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
									onClick={closeUploadModal}
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

export default CreateSectionModal
