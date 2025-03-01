import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TCurrentSpins = 1 | 2 | 3 | null

interface IInitialState {
  currentSpins: TCurrentSpins
  isSpin: boolean | 'animated'
}

const initialState: IInitialState = {
  currentSpins: null,
  isSpin: false,
}

const lottery = createSlice({
  name: 'lottery',
  initialState,
  reducers: {
    setCurrentSpins: (
      state,
      action: PayloadAction<{ newValue: TCurrentSpins }>
    ) => {
      state.currentSpins = action.payload.newValue
    },
    setIsSpin: (
      state,
      action: PayloadAction<{ newValue: boolean | 'animated' }>
    ) => {
      state.isSpin = action.payload.newValue
    },
  },
})

export const { setCurrentSpins, setIsSpin } = lottery.actions
export default lottery.reducer