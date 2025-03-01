import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReactNode } from 'react'

interface ModalsStateType {
	buy_ticket: boolean
	main_error: boolean
	main_error_title?: string
	main_error_subtitle?: string
	main_success: boolean
	main_success_title?: string
	main_success_subtitle?: ReactNode
	main_success_image?: ReactNode
	loading_page: boolean
}

const initialState: ModalsStateType = {
	buy_ticket: false,
	main_error: false,
	main_success: false,
	loading_page: true,
	main_error_subtitle: undefined,
	main_error_title: undefined,
	main_success_subtitle: undefined,
	main_success_title: undefined,
}

const modalsState = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		// loading page
		hideLoadingPage: state => {
			state.loading_page = false
		},
		// buy ticket modal
		hideBuyTicketModal: state => {
			state.buy_ticket = false
		},
		showBuyTicketModal: state => {
			state.buy_ticket = true
		},
		// main error modal
		hideMainErrorModal: state => {
			state.main_error = false
		},
		showMainErrorModal: state => {
			state.main_error = true
		},
		replaceMainErrorTitle: (
			state,
			action: PayloadAction<{ text?: string }>
		) => {
			state.main_error_title = action.payload.text
		},
		replaceMainErrorSubtitle: (
			state,
			action: PayloadAction<{ text?: string }>
		) => {
			state.main_error_subtitle = action.payload.text
		},
		// main success modal
		hideMainSuccessModal: state => {
			state.main_success = false
		},
		showMainSuccessModal: state => {
			state.main_success = true
		},
		replaceMainSuccessTitle: (
			state,
			action: PayloadAction<{ text?: string }>
		) => {
			state.main_success_title = action.payload.text
		},
		replaceMainSuccessImage: (
			state,
			action: PayloadAction<{ image?: ReactNode }>
		) => {
			state.main_success_image = action.payload.image
		},
		replaceMainSuccessSubtitle: (
			state,
			action: PayloadAction<{ text?: ReactNode }>
		) => {
			state.main_success_subtitle = action.payload.text
		},
	},
})

export const {
	hideLoadingPage,
	hideBuyTicketModal,
	showBuyTicketModal,
	hideMainErrorModal,
	showMainErrorModal,
	replaceMainErrorTitle,
	replaceMainErrorSubtitle,
	hideMainSuccessModal,
	replaceMainSuccessSubtitle,
	replaceMainSuccessImage,
	replaceMainSuccessTitle,
	showMainSuccessModal,
} = modalsState.actions
export default modalsState.reducer
