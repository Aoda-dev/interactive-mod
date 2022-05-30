import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCoursesFromFirestore, getAllQuizzesFromFirestore } from '../../firebase/firebase'

import Loader from '../Loader/Loader'

const Dashboard = () => {
	const [quizzes, setQuizzes] = useState([])
	const [courses, setCourses] = useState([])
	const [loading, setLoading] = useState(true)

	let navigate = useNavigate()

	useEffect(() => {
		getAllQuizzesFromFirestore().then((res) => {
			setLoading(false)
			setQuizzes(res)
		})

		getAllCoursesFromFirestore().then((res) => {
			setCourses(res)
		})
	}, [])

	return (
		<div className='flex items-center justify-center flex-col'>
			{loading && <Loader className='w-1/2' />}

			{!loading && (
				<>
					<div className='w-full px-10 my-16 space-y-6'>
						<div className='flex justify-between items-center'>
							<h3 className='text-2xl'>Тесты других людей</h3>

							<button className='px-5 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-400'>Еще</button>
						</div>

						<div className='flex flex-wrap justify-center md:justify-start'>
							{quizzes.map((card) => (
								<div
									onClick={() => navigate(`/home/quizzes/${card.id}`)}
									key={card.id}
									className='m-2 w-[250px] h-[250px] border shadow-md cursor-pointer transition-all hover:scale-125'
								>
									<img className='w-[250px] h-[160px] object-cover' src={card?.data?.imgSrc} alt='' />

									<div className='px-4 py-2 bg-white'>
										<h2>{card?.data?.name}</h2>
										<p className='text-sm truncate text-gray-500'>{card?.data?.description}</p>
										<span className='text-xs'>Автор: {card?.data?.creatorDisplayName}</span>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className='w-full px-10 my-16 space-y-6'>
						<div className='flex justify-between items-center'>
							<h3 className='text-2xl'>Курсы других людей</h3>

							<button className='px-5 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-400'>Еще</button>
						</div>

						<div className='flex flex-wrap justify-center md:justify-start'>
							{courses.map((card) => (
								<div
									onClick={() => navigate(`/home/courses/${card.id}`)}
									key={card.id}
									className='m-2 w-[250px] h-[250px] border shadow-md cursor-pointer transition-all hover:scale-125'
								>
									<img className='w-[250px] h-[160px] object-cover' src={card?.data?.img} alt='' />

									<div className='px-4 py-2 bg-white'>
										<h2>{card?.data?.course?.name}</h2>
										<p className='text-sm truncate text-gray-500'>{card?.data?.course?.title}</p>
										<span className='text-xs'>Автор: {card?.data?.creatorName}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Dashboard
