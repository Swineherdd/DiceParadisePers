import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
	isGiftAnimate: boolean | null
	isGiftLoaded: boolean
	isImagePredictionLoaded: boolean
	magicBallTimeoutFn: () => void
}

const initialState: IInitialState = {
	isGiftAnimate: false,
	isImagePredictionLoaded: false,
	isGiftLoaded: false,
	magicBallTimeoutFn: () => {},
}

const giftsSlice = createSlice({
	name: 'gifts',
	initialState,
	reducers: {
		setGiftAnimate: (
			state,
			action: PayloadAction<{ state: boolean | null }>
		) => {
			state.isGiftAnimate = action.payload.state
		},
		setIsGiftLoaded: (state, action: PayloadAction<{ state: boolean }>) => {
			state.isGiftLoaded = action.payload.state
		},
		setIsImagePredictionLoaded: (
			state,
			action: PayloadAction<{ state: boolean }>
		) => {
			state.isImagePredictionLoaded = action.payload.state
		},
		setMagicBallTimeoutFn: (
			state,
			action: PayloadAction<{ state: () => void }>
		) => {
			state.magicBallTimeoutFn = action.payload.state
		},
	},
})

export const {
	setGiftAnimate,
	setIsGiftLoaded,
	setMagicBallTimeoutFn,
	setIsImagePredictionLoaded,
} = giftsSlice.actions
export default giftsSlice.reducer
