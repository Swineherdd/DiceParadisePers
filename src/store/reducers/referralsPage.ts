import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TTeamsRating = {
	wins: number
	ratePosition: number | null
}
export type TReferralsRating = {
	refs: number
	ratePosition: number | null
}
export type TRatingType = 'teamQuests' | 'referrals'
type TActivateBoost = {
	image: string
	percent: string
	name: string
} | null
type TBoostBonuses = {
	currentBonus: number | null
	referralsQnt: number
	totalGames: number
	availableQnt: number
	paidQnt: number
}
export type TReferralsNfts = ({
	image: string
	name: string
	id: number
} | null)[]

interface IInitialState {
	ratingViewType: TRatingType
	activatedBoost: TActivateBoost
	boostBonuses: TBoostBonuses
	referralLink: string
	referralsRating: (TReferralsRating & {
		nickname: string
	})[]
	teamQuestsRating: (TTeamsRating & {
		nickname: string
	})[]
	youRatingReferrals: TReferralsRating
	youRatingTeams: TTeamsRating
	referralsNfts: TReferralsNfts
	referralsModalState: boolean
}

const initialState: IInitialState = {
	referralsNfts: [],
	ratingViewType: 'teamQuests',
	activatedBoost: null,
	boostBonuses: {
		availableQnt: 0,
		currentBonus: 19,
		paidQnt: 0,
		referralsQnt: 0,
		totalGames: 0,
	},
	referralsModalState: false,
	referralLink: 'empty referral link',
	referralsRating: [],
	teamQuestsRating: [],
	youRatingReferrals: {
		ratePosition: 0,
		refs: 0,
	},
	youRatingTeams: {
		ratePosition: 0,
		wins: 0,
	},
}

const referral = createSlice({
	name: 'referral',
	initialState,
	reducers: {
		setActivateBoost: (
			state,
			action: PayloadAction<{ data: TActivateBoost }>
		) => {
			state.activatedBoost = action.payload.data
		},
		setBoostBonuses: (
			state,
			action: PayloadAction<{ data: TBoostBonuses }>
		) => {
			state.boostBonuses = action.payload.data
		},
		setReferralLink: (state, action: PayloadAction<{ data: string }>) => {
			state.referralLink = action.payload.data
		},
		setReferralsRating: (
			state,
			action: PayloadAction<{
				data: (TReferralsRating & {
					nickname: string
				})[]
			}>
		) => {
			state.referralsRating = action.payload.data
		},
		setTeamQuestsRating: (
			state,
			action: PayloadAction<{
				data: (TTeamsRating & {
					nickname: string
				})[]
			}>
		) => {
			state.teamQuestsRating = action.payload.data
		},
		setYouRatingReferrals: (
			state,
			action: PayloadAction<{ data: TReferralsRating }>
		) => {
			state.youRatingReferrals = action.payload.data
		},
		setYouRatingTeams: (
			state,
			action: PayloadAction<{ data: TTeamsRating }>
		) => {
			state.youRatingTeams = action.payload.data
		},
		setRatingViewType: (
			state,
			action: PayloadAction<{ type: TRatingType }>
		) => {
			state.ratingViewType = action.payload.type
		},
		setReferralsNft: (
			state,
			action: PayloadAction<{
				data: TReferralsNfts
			}>
		) => {
			state.referralsNfts = action.payload.data || []

			const data = state.referralsNfts.filter(el => el !== null)

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
			state.referralsNfts = [...data, ...pushData]
		},
		setReferralsModalState: (
			state,
			action: PayloadAction<{ newState: boolean }>
		) => {
			state.referralsModalState = action.payload.newState
		},
	},
})

export const {
	setActivateBoost,
	setBoostBonuses,
	setReferralLink,
	setReferralsRating,
	setTeamQuestsRating,
	setYouRatingReferrals,
	setYouRatingTeams,
	setRatingViewType,
	setReferralsNft,
	setReferralsModalState,
} = referral.actions
export default referral.reducer
