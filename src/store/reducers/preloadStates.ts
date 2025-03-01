import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
	isLoadPageLoaded: boolean
	isAllPagesLoaded: boolean
}
const initialState: IInitialState = {
	isLoadPageLoaded: false,
	isAllPagesLoaded: false,
}

const loadPage = createSlice({
	name: 'loadPage',
	initialState,
	reducers: {
		setIsLoadPageLoaded: (
			state,
			action: PayloadAction<{ newState: boolean }>
		) => {
			state.isLoadPageLoaded = action.payload.newState
		},
		setIsAllPagesLoaded: (
			state,
			action: PayloadAction<{ newState: boolean }>
		) => {
			state.isAllPagesLoaded = action.payload.newState
		},
	},
})

export const { setIsLoadPageLoaded, setIsAllPagesLoaded } = loadPage.actions
export default loadPage.reducer
