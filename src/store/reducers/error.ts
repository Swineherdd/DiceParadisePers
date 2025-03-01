import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
	error?: string
	hasError: boolean
}
const initialState: IInitialState = {
	error: undefined,
	hasError: false,
}

const error = createSlice({
	name: 'serverError',
	initialState,
	reducers: {
		setErrorData: (state, action: PayloadAction<IInitialState>) => {
			state.error = action.payload.error
			state.hasError = action.payload.hasError
		},
	},
})
export const { setErrorData } = error.actions
export default error.reducer
