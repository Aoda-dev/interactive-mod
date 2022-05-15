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
			localStorage.setItem('myCourses', JSON.stringify(state.myCourses))
		},

		createCourse: (state, action) => {
			state.myCourses = [...state.myCourses, { id: uid(), name: action.payload, sections: [] }]
			localStorage.setItem('myCourses', JSON.stringify(state.myCourses))
		},

		deleteCourse: (state, action) => {
			const currentState = state.myCourses.filter((d) => d.id !== action.payload.id)
			state.myCourses = [...currentState]
			localStorage.setItem('myCourses', JSON.stringify(state.myCourses))
		},

		createSection: (state, action) => {
			const currentState = state.myCourses.map((item) => {
				if (item.id === action.payload.id) {
					item.sections.push({ id: uid(), name: action.payload.title })
				}
				return item
			})

			state.myCourses = [...currentState]
			localStorage.setItem('myCourses', JSON.stringify(state.myCourses))
		},

		createVideoLink: (state, action) => {
			const currentState = state.myCourses.map((item) => {
				if (item.id === action.payload.myCourseId) {
					const currentSection = item.sections.map((section) => {
						if (section.id === action.payload.mySectionId) {
							section.videoLink = action.payload.name
						}
						return section
					})

					item.sections = [...currentSection]
				}

				return item
			})

			state.myCourses = [...currentState]
			localStorage.setItem('myCourses', JSON.stringify(state.myCourses))
		},

		createContent: (state, action) => {
			const currentState = state.myCourses.map((item) => {
				if (item.id === action.payload.myCourseId) {
					const currentSection = item.sections.map((section) => {
						if (section.id === action.payload.mySectionId) {
							section.content = action.payload.name
						}
						return section
					})

					item.sections = [...currentSection]
				}

				return item
			})

			state.myCourses = [...currentState]
			localStorage.setItem('myCourses', JSON.stringify(state.myCourses))
		},

		createLink: (state, action) => {
			const currentState = state.myCourses.map((item) => {
				if (item.id === action.payload.myCourseId) {
					const currentSections = item.sections.map((section) => {
						if (section.id === action.payload.mySectionId) {
							!section.links
								? (section.links = [{ id: uid(), name: action.payload.name, link: action.payload.link }])
								: (section.links = [
										...section.links,
										{ id: uid(), name: action.payload.name, link: action.payload.link },
								  ])
						}
						return section
					})

					item.sections = [...currentSections]
				}
				return item
			})

			state.myCourses = [...currentState]
			localStorage.setItem('myCourses', JSON.stringify(state.myCourses))
		},

		deleteLink: (state, action) => {
			const currentState = state.myCourses.map((item) => {
				if (item.id === action.payload.myCourseId) {
					const currentSections = item.sections.map((section) => {
						if (section.id === action.payload.mySectionId) {
							section.links = section.links.filter((d) => d.id !== action.payload.linkId)
						}
						return section
					})

					item.sections = [...currentSections]
				}
				return item
			})

			state.myCourses = [...currentState]
			localStorage.setItem('myCourses', JSON.stringify(state.myCourses))
		},

		deleteSection: (state, action) => {
			const currentState = state.myCourses.map((item) => {
				if (item.id === action.payload.courseId) {
					item.sections = item.sections.filter((d) => d.id !== action.payload.sectionId)
				}

				return item
			})

			state.myCourses = [...currentState]
			localStorage.setItem('myCourses', JSON.stringify(state.myCourses))
		},
	},
})

export const {
	setMyCourses,
	createCourse,
	createSection,
	deleteSection,
	deleteCourse,
	createVideoLink,
	createContent,
	createLink,
	deleteLink,
} = counterSlice.actions

export default counterSlice.reducer
