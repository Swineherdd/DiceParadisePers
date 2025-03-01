import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TCardData = { id: number; image: string; name: string }
interface IInitialState {
	selectedCardData?: TCardData
	craftCardsData: Record<number, TCardData | undefined>
	craftCardsDataArr: TCardData[]
	sliderDataArr: (TCardData | null)[]
	alakazamClickUpdated: boolean
}
const initialState: IInitialState = {
	craftCardsData: {},
	craftCardsDataArr: [],
	sliderDataArr: [],
	alakazamClickUpdated: false,
}

const craft = createSlice({
	name: 'craft',
	initialState,
	reducers: {
		setSelectedCardData: (
			state,
			action: PayloadAction<{ data?: TCardData }>
		) => {
			state.selectedCardData = action.payload.data
		},
		addCraftCardData: (state, action: PayloadAction<{ data: TCardData }>) => {
			state.craftCardsData[action.payload.data.id] = action.payload.data
			state.craftCardsDataArr.push(action.payload.data)
		},
		removeCraftCardData: (state, action: PayloadAction<{ id: number }>) => {
			state.craftCardsData[action.payload.id] = undefined

			state.craftCardsDataArr = state.craftCardsDataArr.filter(el => {
				return el.id !== action.payload.id
			})
		},
		setSliderData: (state, action: PayloadAction<{ arr: TCardData[] }>) => {
			state.sliderDataArr = action.payload.arr

			const data = state.sliderDataArr.filter(el => el !== null)

			function nearestDivisible(num: number, div: number): number {
				// Если num делится на div, возвращаем 1
				if (num % div === 0) {
					return num + 1
				}
				// Находим ближайшее число впереди, которое делится на div
				const remainder = num % div
				const nearest = num + (div - remainder)
				return nearest
			}

			const addItemsQnt =
				data.length === 0 ? 3 : nearestDivisible(data.length, 3) - data.length

			const pushData: null[] = []
			Array(addItemsQnt)
				.fill([])
				.forEach(() => {
					pushData.push(null)
				})
			state.sliderDataArr = [...data, ...pushData]
		},
		addSliderDataItem: (state, action: PayloadAction<{ item: TCardData }>) => {
			state.sliderDataArr.push(action.payload.item)

			const data = state.sliderDataArr.filter(el => el !== null)

			function nearestDivisible(num: number, div: number): number {
				// Если num делится на div, возвращаем 1
				if (num % div === 0) {
					return num + 1
				}
				// Находим ближайшее число впереди, которое делится на div
				const remainder = num % div
				const nearest = num + (div - remainder)
				return nearest
			}
			const addItemsQnt =
				data.length === 0 ? 3 : nearestDivisible(data.length, 3) - data.length
			const pushData: null[] = []
			Array(addItemsQnt)
				.fill([])
				.forEach(() => {
					pushData.push(null)
				})
			state.sliderDataArr = [...data, ...pushData]
		},
		removeSliderDataItem: (
			state,
			action: PayloadAction<{ ids: number | number[] }>
		) => {
			const ids = action.payload.ids
			if (typeof ids === 'number') {
				state.sliderDataArr = state.sliderDataArr.filter(el => {
					if (el !== null) return el.id !== ids
				})
			} else {
				state.sliderDataArr = state.sliderDataArr.filter(el => {
					let result = true
					if (el !== null) {
						for (let index = 0; index < ids.length; index++) {
							if (ids[index] === el.id) {
								result = false
								break
							}
						}
					}
					return result
				})
			}
		},
		resetCraftCards: state => {
			state.craftCardsData = {}
			state.craftCardsDataArr = []
		},
		toggleAlakzamClickUpdated: state => {
			state.alakazamClickUpdated = !state.alakazamClickUpdated
		},
	},
})

export default craft.reducer
export const {
	setSelectedCardData,
	addCraftCardData,
	removeCraftCardData,
	resetCraftCards,
	addSliderDataItem,
	setSliderData,
	removeSliderDataItem,
	toggleAlakzamClickUpdated,
} = craft.actions
