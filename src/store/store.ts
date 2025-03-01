import { configureStore } from '@reduxjs/toolkit'
import modalsReducer from './reducers/modals'
import gifts from './reducers/gifts'
import images from './reducers/images'
import error from './reducers/error'
import craft from './reducers/craft'
import referralsPage from './reducers/referralsPage'
import lottery from './reducers/lottery'
import preloadStates from './reducers/preloadStates'
import balanceSlice from './reducers/balance'
import { balanceApi } from './api/balance'
import remoteImagesReducer from './reducers/remoteImages'

const store = configureStore({
	reducer: {
		modals: modalsReducer,
		gifts,
		images,
		error,
		craft,
		referralsPage,
		lottery,
		preloadStates,
		balance: balanceSlice,
		remoteImages: remoteImagesReducer,
		[balanceApi.reducerPath]: balanceApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(balanceApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export default store
