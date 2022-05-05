import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import myQuizzesReducer from '../features/myQuizzes/myQuizzes'
import myCoursesReducer from '../features/myCourses/myCourses'

export default configureStore({
	reducer: {
		user: userReducer,
		myQuizzes: myQuizzesReducer,
		myCourses: myCoursesReducer,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
})
