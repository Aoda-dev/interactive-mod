import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneData, getQuizResultAll } from '../../firebase/firebase'
import Loader from '../Loader/Loader'
import Header from './Header'
import Hero from './Hero'
import LeaderBoard from './LeaderBoard'
import Share from './Share'

const MyQuizzesInside = () => {
	const { id } = useParams()
	const [quiz, setQuiz] = useState({})
	const [quizLeaderboard, setQuizLeaderboard] = useState([])
	const { myQuizzesLoading } = useSelector((state) => state.myQuizzes)
	const { loading } = useSelector((state) => state.user)

	useEffect(() => {
		getOneData(id).then((res) => setQuiz(res))
		getQuizResultAll(id).then((res) => {
			const arrayOfObj = res?.sort((a, b) => (a?.data?.userScore > b?.data?.userScore ? -1 : 1))

			setQuizLeaderboard(arrayOfObj)
		})
	}, [id])

	return (
		<div className='w-full px-0 pb-20 md:px-0'>
			{loading && ''}

			{myQuizzesLoading && (
				<div className='flex justify-center items-center'>
					<Loader className='w-1/2 h-1/2 overflow-hidden bg-white flex justify-center items-center' />
				</div>
			)}

			{quiz && !myQuizzesLoading && !loading && (
				<>
					<Header
						quiz={quiz}
						quizLeaderboard={quizLeaderboard}
						id={id}
						creatorId={quiz?.creatorId}
						imgId={quiz?.img}
						title={quiz?.name}
					/>
					<Hero
						id={id}
						quiz={quiz}
						img={quiz?.imgSrc}
						title={quiz?.name}
						creatorName={quiz?.creatorDisplayName}
						creatorImg={quiz?.creatorImg}
						description={quiz?.description}
						timer={quiz?.timer}
						quizLength={quiz?.quiz?.length}
					/>

					<Share id={id} />

					<LeaderBoard quizLeaderboard={quizLeaderboard} />
				</>
			)}

			{!quiz && !loading && (
				<h2 className='text-center mt-14 text-xl px-5'>Неверная ссылка или такой тест не существует</h2>
			)}
		</div>
	)
}

export default MyQuizzesInside
