import { createSlice, current } from '@reduxjs/toolkit'
import { uid } from '../../helper/uniqId'

export const counterSlice = createSlice({
	name: 'myCourses',
	initialState: {
		placeholderLoading: null,
		myCoursesLoading: null,
		myCourses: [],
	},
	reducers: {
		setMyCourses: (state, action) => {
			state.myCourses = [...action.payload]
		},

		createCourse: (state, action) => {
			state.myCourses = [...state.myCourses, { id: uid(), name: action.payload, sections: [] }]
		},

		deleteCourse: (state, action) => {
			const currentState = state.myCourses.filter((d) => d.id !== action.payload.id)

			state.myCourses = [...currentState]
		},

		createSection: (state, action) => {
			const currentState = state.myCourses.map((item) => {
				if (item.id === action.payload.id) {
					item.sections.push({ id: uid(), name: action.payload.title })
				}
				return item
			})

			state.myCourses = [...currentState]
		},

		deleteSection: (state, action) => {
			const currentState = state.myCourses.map((item) => {
				if (item.id === action.payload.courseId) {
					item.sections = item.sections.filter((d) => d.id !== action.payload.sectionId)
				}

				return item
			})

			state.myCourses = [...currentState]
		},
	},
})

export const { setMyCourses, createCourse, createSection, deleteSection, deleteCourse } = counterSlice.actions

export default counterSlice.reducer
