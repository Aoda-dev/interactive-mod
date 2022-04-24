import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Lottie from 'react-lottie-player'

import { getOneQuiz } from '../../firebase/firebase'

import wrongJson from '../../assets/json/wrong.json'
import correctJson from '../../assets/json/done.json'
import timeEndJson from '../../assets/json/timeend.json'

import QuizHowToPlay from './QuizHowToPlay'
import QuizAnswers from './QuizAnswers'
import QuizHeader from './QuizHeader'
import Header from './Header'

import correctSound from '../../assets/sounds/correct.mp3'
import inCorrectSound from '../../assets/sounds/incorrect.mp3'
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader'

const Quiz = () => {
	let navigate = useNavigate()
	const { id } = useParams()

	const correctSoundRef = useRef(null)
	const inCorrectSoundRef = useRef(null)

	const { user } = useSelector((state) => state.user)
	const { myQuizzesLoading } = useSelector((state) => state.myQuizzes)
	const [startQuiz, setStartQuiz] = useState(false)
	const [minutes, setMinutes] = useState(10)
	const [seconds, setSeconds] = useState(5)
	const [quiz, setQuiz] = useState([])
	const [userSeconds, setUserSeconds] = useState(0)
	const [userMinutes, setUserMinutes] = useState(0)
	const [isEndedTime, setIsEndedTime] = useState(false)
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
	const [isWrongAnswer, setIsWrongAnswer] = useState(false)
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [questions, setQuestion] = useState([
		{
			questionText: '',
			answersOptions: [
				{ id: null, answerText: '', isCorrect: false },
				{ id: null, answerText: '', isCorrect: false },
				{ id: null, answerText: '', isCorrect: false },
				{ id: null, answerText: '', isCorrect: false },
			],
		},
	])

	const [quizEnd, setQuizEnd] = useState(false)
	const [results, setResults] = useState([])

	useEffect(() => {
		getOneQuiz(id).then((res) => {
			if (!res) return navigate('/404', { state: { message: 'Тест не найден' } })

			setQuiz(res)
			setQuestion(res?.quiz)
			const [_minutes, _seconds] = res?.timer.split(':')
			setMinutes(+_minutes)
			setSeconds(+_seconds)
		})
	}, [])

	useEffect(() => {
		if (!startQuiz) return

		let interval = setInterval(() => {
			if (userSeconds > 59) {
				setUserMinutes((prev) => prev + 1)
				setUserSeconds(0)
			} else {
				setUserSeconds((prev) => prev + 1)
			}
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [startQuiz, userSeconds, userMinutes])

	useEffect(() => {
		if (quizEnd) {
			navigate('/quiz/result', {
				state: {
					quizId: id,
					userId: user.uid,
					userDisplayName: user.displayName,
					userPhotoURL: user.photoURL,
					userResults: results,
					quiz: quiz,
					userFinishedTime: { minutes: userMinutes, seconds: userSeconds },
				},
			})
		}
	}, [quizEnd])

	useEffect(() => {
		if (!startQuiz) return

		let interval = setInterval(() => {
			if (seconds > 0) {
				setSeconds((prev) => prev - 1)
			}

			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(interval)
					setIsEndedTime(true)
					setTimeout(() => {
						setQuizEnd(true)
					}, 3000)
				} else {
					setMinutes((prev) => prev - 1)
					setSeconds(59)
				}
			}
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [startQuiz, seconds, minutes])

	const selectAnswer = (selectedAnswer, id, isTrue) => {
		if (isTrue) {
			setIsCorrectAnswer(true)
			correctSoundRef.current.play()

			setResults((prev) => [
				...prev,
				{ ...questions[currentQuestion], userAnswerId: id, userAnswer: selectedAnswer, isTrue },
			])

			const nextQuestion = currentQuestion + 1

			if (nextQuestion < questions.length) {
				setCurrentQuestion(nextQuestion)
			} else {
				setTimeout(() => {
					setQuizEnd(true)
				}, 1700)
			}

			setTimeout(() => {
				setIsCorrectAnswer(false)
			}, 1500)
		} else {
			setIsWrongAnswer(true)
			inCorrectSoundRef.current.play()

			setResults((prev) => [
				...prev,
				{ ...questions[currentQuestion], userAnswerId: id, userAnswer: selectedAnswer, isTrue },
			])

			const nextQuestion = currentQuestion + 1

			if (nextQuestion < questions.length) {
				setCurrentQuestion(nextQuestion)
			} else {
				setTimeout(() => {
					setQuizEnd(true)
				}, 1700)
			}

			setTimeout(() => {
				setIsWrongAnswer(false)
			}, 1700)
		}
	}

	return (
		<div className='w-full min-h-screen relative bg-gray-100 flex flex-col justify-center items-center overflow-x-hidden text-white'>
			{myQuizzesLoading && (
				<Loader className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2' />
			)}

			{!myQuizzesLoading && (
				<>
					<Header text='Имя теста' />

					{!startQuiz && <QuizHowToPlay setStartQuiz={setStartQuiz} />}

					{startQuiz && (
						<>
							<audio className='hidden' controls ref={correctSoundRef} src={correctSound}></audio>
							<audio className='hidden' controls ref={inCorrectSoundRef} src={inCorrectSound}></audio>

							{isWrongAnswer && (
								<div className='w-screen h-screen absolute flex items-center justify-center'>
									<div className='w-1/1 sm:w-1/2 md:w-1/3 h-1/1 absolute z-50'>
										<Lottie style={{ width: 350, height: 350 }} loop play animationData={wrongJson} />
									</div>
								</div>
							)}

							{isCorrectAnswer && (
								<div className='w-screen h-screen absolute flex items-center justify-center'>
									<div className='w-1/1 sm:w-1/2 md:w-1/3 h-1/1 absolute z-50'>
										<Lottie loop play animationData={correctJson} />
									</div>
								</div>
							)}

							{isEndedTime && (
								<div className='w-screen h-screen absolute flex items-center justify-center'>
									<div className='w-1/3 h-1/1 absolute z-50'>
										<Lottie loop play animationData={timeEndJson} />
									</div>
								</div>
							)}

							<div className='container px-10 mt-20 md:px-24 xl:px-56'>
								<QuizHeader minutes={minutes} seconds={seconds} text={questions[currentQuestion]?.questionText} />
								<QuizAnswers selectAnswer={selectAnswer} options={questions[currentQuestion]?.answersOptions} />
							</div>
						</>
					)}
				</>
			)}
		</div>
	)
}

export default Quiz
