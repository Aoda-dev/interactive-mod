import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/ru'

import NewQuiz from './NewQuiz'

import { setImageToFirestorage, setQuizToFirestore } from '../../firebase/firebase'
import { CreateQuizArrowIcon } from '../../assets/svg/icons'

const fileToDataUri = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (event) => {
			resolve(event.target.result)
		}
		reader.readAsDataURL(file)
	})

const QuizCreate = () => {
	let navigate = useNavigate()
	const { user } = useSelector((state) => state.user)
	const [quizLinkId, setQuizLinkId] = useState(null)
	const [dataUri, setDataUri] = useState('')
	const [quizTitle, setQuizTitle] = useState('')
	const [description, setDescription] = useState('')
	const [timer, setTimer] = useState(null)
	const [questions, setQuestions] = useState([
		{
			id: 0,
			questionText: '',
			answersOptions: [
				{ id: 0, answerText: '', isCorrect: false },
				{ id: 1, answerText: '', isCorrect: false },
				{ id: 2, answerText: '', isCorrect: false },
				{ id: 3, answerText: '', isCorrect: false },
			],
		},
	])

	let [isOpen, setIsOpen] = useState(false)

	function closeModal() {
		navigate(`/home/quizzes/${quizLinkId}`)
		setIsOpen(false)
	}

	const handleUploadImg = (e) => {
		let pattern = /image-*/

		if (!e.target.files[0].type.match(pattern)) return alert('Invalid format')

		if (!e.target.files[0]) return setDataUri('')

		fileToDataUri(e.target.files[0]).then((dataUri) => {
			setDataUri(dataUri)
		})
	}

	const changeQuestionTitle = (id, title) => {
		const _questions = [...questions]
		_questions[id].questionText = title

		setQuestions(_questions)
	}

	const changeQuestion = (id, answers, userAnswer) => {
		const _questions = [...questions]

		Object.entries(answers).forEach(([key, value], index) => {
			_questions[id].answersOptions[index].answerText = value

			if (key === userAnswer) {
				_questions[id].answersOptions[index].isCorrect = true
			} else {
				_questions[id].answersOptions[index].isCorrect = false
			}
		})

		setQuestions(_questions)
	}

	const addQuestion = () => {
		const id = questions.length

		const newQuestion = {
			id: id,
			questionText: '',
			answersOptions: [
				{ id: 0, answerText: '', isCorrect: false },
				{ id: 1, answerText: '', isCorrect: false },
				{ id: 2, answerText: '', isCorrect: false },
				{ id: 3, answerText: '', isCorrect: false },
			],
		}

		setQuestions((prev) => [...prev, newQuestion])
	}

	const uploadQuiz = () => {
		for (let i = 0; i < questions.length; i++) {
			if (questions[i].questionText.trim() === '') {
				return alert('Заполните все поля')
			}

			for (let j = 0; j < questions[i].answersOptions.length; j++) {
				if (questions[i].answersOptions[j].answerText.trim() === '') {
					return alert('Заполните все поля')
				}

				if (!questions[i].answersOptions.find((item) => item.isCorrect === true)) {
					return alert('Выберите правильные ответы')
				}
			}
		}

		if (!timer) return alert('Выберите время окончание теста')

		if (dataUri === '') return alert('Выберите фотографию')

		if (description.trim() === '') return alert('Добавьте описание к тесту')

		if (quizTitle.trim() === '') return alert('Введите имя теста')

		const uid = Math.floor(Math.random() * Date.now())

		moment.locale('ru')
		const createdAt = moment().format('LL')

		setImageToFirestorage(uid, dataUri)

		setQuizToFirestore({
			quizId: uid,
			name: quizTitle,
			quiz: questions,
			img: uid,
			timer: timer,
			createdAt: createdAt,
			description: description,
			creatorId: user.uid,
			creatorDisplayName: user.displayName,
			creatorImg: user.photoURL,
		}).then((res) => {
			setQuizLinkId(res)
		})

		setIsOpen(true)
	}

	return (
		<div className='container overflow-x-hidden px-5 sm:mx-auto'>
			<h1 className='text-2xl font-semibold mt-5'>Создание теста</h1>

			<div className='p-0 space-y-3 sm:p-5'>
				<div className='flex space-x-3'>
					<span className='py-3'>Имя:</span>
					<input
						value={quizTitle}
						onChange={(e) => setQuizTitle(e.target.value)}
						className='w-full outline-none py-3 border-b border-gray-500'
						type='text'
						placeholder='Введите имя теста'
					/>
				</div>

				<div className='flex space-x-3'>
					<span className='py-3'>Описание:</span>
					<input
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className='w-full outline-none py-2 border-b border-gray-500'
						type='text'
						placeholder='Введите имя теста'
					/>
				</div>

				<select
					onChange={(e) => setTimer(e.target.value)}
					className='form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
					aria-label='Default select example'
					defaultValue='default'
				>
					<option value='default' disabled>
						Выберите время окончания теста
					</option>
					<option value='0:30'>30 секунд</option>
					<option value='15:00'>15 минут</option>
					<option value='30:00'>30 минут</option>
					<option value='60:00'>60 минут</option>
				</select>

				<div className='flex items-center space-x-3'>
					<span className='py-3'>Выберите фотографию:</span>
					<input
						type='file'
						name='quizPic'
						accept='image/*'
						className='text-base font-normal text-gray-700'
						onChange={handleUploadImg}
					/>
				</div>
			</div>

			<div className='space-y-6'>
				{questions.map((item, index) => (
					<NewQuiz
						key={index}
						id={item.id}
						changeQuestionTitle={changeQuestionTitle}
						changeQuestion={changeQuestion}
						index={index}
					/>
				))}
			</div>

			<button onClick={addQuestion} className='w-full bg-indigo-600 p-3 my-5 text-white'>
				Добавить вопрос
			</button>
			<button
				onClick={uploadQuiz}
				className='w-1/2 mx-auto relative bg-indigo-600 p-3 mb-10 flex items-center justify-center text-white'
			>
				<span>Создать тест</span>
				<div className='hidden absolute right-5 sm:block'>
					<CreateQuizArrowIcon className='h-6 w-6' />
				</div>
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='fixed bg-white inset-0 z-50 overflow-y-auto' onClose={closeModal}>
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
									Тест успешно создан
								</Dialog.Title>
								<div className='mt-2'>
									<p className='text-sm text-gray-500'>Нажмите на кнопку чтобы открыть тест.</p>
								</div>

								<div className='mt-4'>
									<button
										type='button'
										className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
										onClick={closeModal}
									>
										Открыть
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	)
}

export default QuizCreate
