import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import myQuizzesReducer from '../features/myQuizzes/myQuizzes'

export default configureStore({
	reducer: {
		user: userReducer,
		myQuizzes: myQuizzesReducer,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
})
