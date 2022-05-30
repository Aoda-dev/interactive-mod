import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Home/Dashboard'

import Home from './components/Home/Home'
import ProtectedRoute from './helper/ProtectedRoute'
import MyCourses from './components/Home/MyCourses/MyCourses'
import MyQuizzes from './components/Home/MyQuizzes/MyQuizzes'
import Landing from './components/Landing/Landing'
import Quiz from './components/Quiz/Quiz'
import QuizCreate from './components/QuizCreate/QuizCreate'
import QuizResult from './components/QuizResult/QuizResult'
import Loader from './components/Loader/Loader'
import MyQuizzesInside from './components/MyQuizzesInside/MyQuizzesInside'
import NotFound from './components/404/NotFound'
import MyQuizzesResult from './components/Home/MyQuizzesResult/MyQuizzesResult'
import MyCoursesInside from './components/MyCoursesInside/MyCoursesInside'
import Login from './components/Login/Login'
import CourseCreate from './components/CourseCreate/CourseCreate'
import CourseEdit from './components/CourseCreate/CourseEdit/CourseEdit'
import CourseSection from './components/CourseCreate/CourseSection/CourseSection'
import MyCoursesWalk from './components/Home/MyCoursesWalk/MyCoursesWalk'
import MyCoursesWalkSection from './components/Home/MyCoursesWalkSection/MyCoursesWalkSection'
import Author from './components/Home/Author'

const App = () => {
	const [firstLoad, setFirstLoad] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setFirstLoad(false)
		}, 2000)
	}, [])

	return (
		<BrowserRouter>
			{firstLoad && <Loader className='w-screen h-screen overflow-hidden bg-white flex justify-center items-center' />}

			{!firstLoad && (
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route
						path='/home'
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					>
						<Route path='author' element={<Author />} />
						<Route path='dashboard' element={<Dashboard />} />
						<Route path='myquizzes' element={<MyQuizzes />} />
						<Route path='quizzes/:id' element={<MyQuizzesInside />} />
						<Route path='quizzes/:id/results' element={<MyQuizzesResult />} />
						<Route path='mycourses' element={<MyCourses />} />
						<Route path='courses/:id' element={<MyCoursesInside />} />
						<Route path='courses/:id/walk' element={<MyCoursesWalk />} />
						<Route path='courses/:id/walk/:sectionid' element={<MyCoursesWalkSection />} />
					</Route>

					<Route
						path='/course/create'
						element={
							<ProtectedRoute>
								<CourseCreate />
							</ProtectedRoute>
						}
					>
						<Route path='edit/:id' element={<CourseEdit />} />
						<Route path='edit/:id/:id' element={<CourseSection />} />
					</Route>

					<Route
						path='/quiz/create'
						element={
							<ProtectedRoute>
								<QuizCreate />
							</ProtectedRoute>
						}
					/>

					<Route
						path='/quiz/:id'
						element={
							<ProtectedRoute>
								<Quiz />
							</ProtectedRoute>
						}
					/>
					<Route path='/quiz/result' element={<QuizResult />} />

					<Route path='/login' element={<Login />} />
					<Route path='/404' element={<NotFound />} />
					<Route path='*' element={<Navigate to='/404' replace />} />
				</Routes>
			)}
		</BrowserRouter>
	)
}

export default App
