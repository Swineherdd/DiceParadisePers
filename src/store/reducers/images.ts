import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TInitialState = {
	images: string[]
}

const initialState: TInitialState = {
	images: [],
}

const images = createSlice({
	name: 'images',
	initialState,
	reducers: {
		setImages(state, action: PayloadAction<{ images: string[] }>) {
			state.images = action.payload.images
		},
	},
})
export const { setImages } = images.actions
export default images.reducer
