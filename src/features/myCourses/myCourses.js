import { createSlice } from '@reduxjs/toolkit'
import { uid } from '../../helper/uniqId'

export const counterSlice = createSlice({
	name: 'myCourses',
	initialState: {
		placeholderLoading: null,
		myCoursesLoading: null,
		update: null,
		updateSection: null,
		sections: [],
		myCourses: [],
	},
	reducers: {
		setMyCourses: (state, action) => {
			state.myCourses = [...action.payload]
		},

		updateMyCourse: (state, action) => {
			state.update = !state.update
		},

		createCourse: (state, action) => {
			state.myCourses = [...state.myCourses, { id: action.payload.id, data: action.payload.data }]
		},

		updateCourseSection: (state, action) => {
			state.updateSection = !state.updateSection
		},

		setSections: (state, action) => {
			state.sections = [...action.payload]
		},

		deleteCourse: (state, action) => {
			const currentState = state.myCourses.filter((d) => d.id !== action.payload.id)
			state.myCourses = [...currentState]
		},

		createVideoLink: (state, action) => {
			const currentSections = state.sections.map((section) => {
				if (section.id === action.payload.id) {
					section.data.videoLink = action.payload.name
				}
				return section
			})

			state.sections = [...currentSections]
		},

		createContent: (state, action) => {
			const currentSections = state.sections.map((section) => {
				if (section.id === action.payload.id) {
					section.data.content = action.payload.name
				}
				return section
			})

			state.sections = [...currentSections]
		},

		createLink: (state, action) => {
			const currentSections = state.sections.map((section) => {
				if (section.id === action.payload.id) {
					!section.data.links
						? (section.data.links = [{ id: uid(), name: action.payload.name, link: action.payload.link }])
						: (section.data.links = [
								...section.data.links,
								{ id: uid(), name: action.payload.name, link: action.payload.link },
						  ])
				}

				return section
			})

			state.sections = [...currentSections]
		},

		deleteLink: (state, action) => {
			const currentSections = state.sections.map((section) => {
				if (section.id === action.payload.id) {
					section.data.links = section.data.links.filter((d) => d.id !== action.payload.linkId)
				}

				return section
			})

			state.sections = [...currentSections]
		},

		createDocument: (state, action) => {
			const currentSections = state.sections.map((section) => {
				if (section.id === action.payload.id) {
					!section.data.documents
						? (section.data.documents = [{ id: action.payload.uniqid, name: action.payload.name }])
						: (section.data.documents = [
								...section.data.documents,
								{ id: action.payload.uniqId, name: action.payload.name },
						  ])
				}

				return section
			})

			state.sections = [...currentSections]
		},

		deleteDocument: (state, action) => {
			const currentSections = state.sections.map((section) => {
				if (section.id === action.payload.id) {
					section.data.documents = section.data.documents.filter((d) => d.id !== action.payload.documentId)
				}

				return section
			})

			state.sections = [...currentSections]
		},

		deleteSection: (state, action) => {
			const currentState = state.myCourses.map((item) => {
				if (item.id === action.payload.courseId) {
					item.data.course.sections = item.data.course.sections.filter((d) => d.id !== action.payload.sectionId)
				}

				return item
			})

			state.myCourses = [...currentState]
		},
	},
})

export const {
	setMyCourses,
	createCourse,
	updateMyCourse,
	updateCourseSection,
	setSections,
	deleteSection,
	deleteCourse,
	createVideoLink,
	createContent,
	createDocument,
	deleteDocument,
	createLink,
	deleteLink,
} = counterSlice.actions

export default counterSlice.reducer
