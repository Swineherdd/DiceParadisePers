import { getRemoteImagesPath } from '@/lib'
import { TImagesConfig } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type RemoteImage = {
	path: string
	endingParams: Record<string, number>[]
}

interface IInitialState {
	remoteImages: TImagesConfig[]
}
const initialState: IInitialState = {
	remoteImages: [],
}

const remoteImagesSlice = createSlice({
	name: 'remoteImages',
	initialState,
	reducers: {
		addRemoteImage: (state, action: PayloadAction<RemoteImage>) => {
			state.remoteImages.push([
				{ alt: '', src: '' },
				getRemoteImagesPath(action.payload),
			])
		},
	},
})

export const { addRemoteImage } = remoteImagesSlice.actions
export default remoteImagesSlice.reducer
