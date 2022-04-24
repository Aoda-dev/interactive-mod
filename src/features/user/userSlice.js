import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		loading: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setUser, setLoading } = counterSlice.actions

export default counterSlice.reducer
