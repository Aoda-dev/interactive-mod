import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
	name: 'myQuizzes',
	initialState: {
		placeholderLoading: null,
		myQuizzesLoading: null,
		myQuizzes: [],
		passedQuizzes: [],
		myTopQuizzes: [],
	},
	reducers: {
		setMyQuizzes: (state, action) => {
			state.myQuizzes = [...action.payload]
		},

		setPassedQuizzes: (state, action) => {
			state.passedQuizzes = [...action.payload]
		},

		setMyTopQuizzes: (state) => {
			if (!state.myQuizzes) return

			const top = []

			for (let i = 0; i < 3; i++) {
				if (!state.myQuizzes[i]) break
				top.push(state.myQuizzes[i])
			}

			state.myTopQuizzes = [...top]
		},

		setMyQuizzesPlaceholderLoading: (state, action) => {
			state.placeholderLoading = action.payload
		},

		setMyQuizzesLoading: (state, action) => {
			state.myQuizzesLoading = action.payload
		},
	},
})

export const { setMyQuizzesPlaceholderLoading, setMyQuizzes, setMyTopQuizzes, setMyQuizzesLoading, setPassedQuizzes } =
	counterSlice.actions

export default counterSlice.reducer
