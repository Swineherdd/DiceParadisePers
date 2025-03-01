import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IInitialState {
	ticketsBalance?: number
	tonBalance?: string
	level?: number
	remainingTime: number
	unclaimedBonus?: number
}

const initialState: IInitialState = {
	remainingTime: 86400,
}

const balanceSlice = createSlice({
	name: 'balanceSlice',
	initialState,
	reducers: {
		setTicketsBalance: (state, action: PayloadAction<{ new: number }>) => {
			state.ticketsBalance = action.payload.new
		},
		setTonBalance: (state, action: PayloadAction<{ new: string }>) => {
			state.tonBalance = action.payload.new
		},
		setLevel: (state, action: PayloadAction<{ new: number }>) => {
			state.level = action.payload.new
		},
		setRemainingTime: (state, action: PayloadAction<{ new: number }>) => {
			state.remainingTime = action.payload.new
		},
		setUnclaimedBonus: (state, action: PayloadAction<{ new: number }>) => {
			state.unclaimedBonus = action.payload.new
		},
	},
})

export const {
	setTicketsBalance,
	setTonBalance,
	setLevel,
	setRemainingTime,
	setUnclaimedBonus,
} = balanceSlice.actions
export default balanceSlice.reducer
