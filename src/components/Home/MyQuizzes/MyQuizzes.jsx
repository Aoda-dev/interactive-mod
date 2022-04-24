import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Header from './Header'
import MyAllQuizzes from './MyAllQuizzes'
import TopQuizzes from './TopQuizzes'
import { getDataOneTime, getMyPassedQuizzes, getMyPassedQuizzesImg, getMyQuizzesImg } from '../../../firebase/firebase'
import Loader from '../../Loader/Loader'
import PassedQuizzes from './PassedQuizzes'

const MyQuizzes = () => {
	const { user } = useSelector((state) => state.user)
	const { myQuizzes, myQuizzesLoading, passedQuizzes } = useSelector((state) => state.myQuizzes)

	useEffect(() => {
		new Promise((resolve, _) => {
			resolve(getDataOneTime(user?.uid))
		}).then(() => {
			getMyQuizzesImg()
		})

		new Promise((resolve, _) => {
			resolve(getMyPassedQuizzes(user?.uid))
		}).then(() => {
			getMyPassedQuizzesImg()
		})
	}, [user?.uid])

	return (
		<div className='w-full relative px-3 pb-7 md:px-10'>
			{myQuizzesLoading && (
				<Loader className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2' />
			)}

			{!myQuizzesLoading && (
				<>
					<Header />
					<div className='space-y-6 mt-10'>
						{passedQuizzes.length > 0 && !myQuizzesLoading && <PassedQuizzes />}
						{myQuizzes.length > 0 && !myQuizzesLoading && <TopQuizzes />}
					</div>
					{/* <MyAllQuizzes /> */}
				</>
			)}

			{!myQuizzes.length > 0 && !myQuizzesLoading && (
				<h2 className='mt-10 text-xl'>
					У вас еще нету тестов.{' '}
					<Link className='text-red-500' to='/quiz/create'>
						Нажмите здесь чтобы создать новый тест
					</Link>
				</h2>
			)}
		</div>
	)
}

export default MyQuizzes
