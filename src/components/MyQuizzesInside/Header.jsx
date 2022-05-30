import React, { Fragment, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { deleteOneQuiz } from '../../firebase/firebase'
import { ArrowNarrowLeft, HumburgerMenuIcon } from '../../assets/svg/icons'
import { useSelector } from 'react-redux'

const Header = ({ id, imgId, creatorId, title, quizLeaderboard, quiz }) => {
	const { user } = useSelector((state) => state.user)
	const navigate = useNavigate()
	let [isOpen, setIsOpen] = useState(false)

	const isAdmin = user?.uid === creatorId

	const handleDelete = () => {
		deleteOneQuiz(id, imgId)
		navigate('/home/myquizzes')
		setIsOpen(false)
	}

	return (
		<div className='flex items-center justify-between p-5'>
			<div className='flex items-center space-x-3'>
				<button onClick={() => navigate(-1)} className='cursor-pointer p-2 '>
					<ArrowNarrowLeft className='h-6 w-6 stroke-gray-400' />
				</button>
				<h2 className='-mt-0.5 text-lg'>{title}</h2>
			</div>

			{isAdmin ? (
				<>
					<Menu as='div' className='relative inline-block text-left'>
						<div>
							<Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
								<HumburgerMenuIcon className='w-8 h-8' />
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter='transition ease-out duration-100'
							enterFrom='transform opacity-0 scale-95'
							enterTo='transform opacity-100 scale-100'
							leave='transition ease-in duration-75'
							leaveFrom='transform opacity-100 scale-100'
							leaveTo='transform opacity-0 scale-95'
						>
							<Menu.Items className='absolute right-0 w-56 mt-2 z-50 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
								<div className='px-1 py-1 '>
									<Menu.Item>
										{({ active }) => (
											<button
												onClick={() =>
													navigate(`/home/quizzes/${id}/results`, { state: { id, title, quizLeaderboard, quiz } })
												}
												className={`${
													active ? 'bg-indigo-500 text-white' : 'text-gray-900'
												} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
											>
												Результаты
											</button>
										)}
									</Menu.Item>
								</div>
								<div className='px-1 py-1'>
									<Menu.Item>
										{({ active }) => (
											<button
												onClick={() => setIsOpen(true)}
												className={`${
													active ? 'bg-red-500 text-white' : 'text-red-500'
												} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
											>
												Удалить тест
											</button>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>

					<Transition appear show={isOpen} as={Fragment}>
						<Dialog
							as='div'
							className='fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-25'
							onClose={() => setIsOpen(false)}
						>
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
									<div className='inline-block w-full max-w-md p-6 my-8 space-y-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
										<Dialog.Title as='h3' className='text-2xl font-medium leading-6 text-red-500'>
											Удалить тест
										</Dialog.Title>
										<div className='mt-2'>
											<p className='text-lg text-gray-500'>Вы действительно хотите удалить тест?</p>
										</div>

										<div className='mt-4 space-x-6'>
											<button
												type='button'
												className='inline-flex justify-center px-5 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
												onClick={handleDelete}
											>
												Да
											</button>
											<button
												type='button'
												className='inline-flex justify-center px-5 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
												onClick={() => setIsOpen(false)}
											>
												нет
											</button>
										</div>
									</div>
								</Transition.Child>
							</div>
						</Dialog>
					</Transition>
				</>
			) : null}
		</div>
	)
}

export default Header
