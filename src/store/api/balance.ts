import {
	IClaimDailyBonus,
	IClaimedBonus,
	IGetUserLevel,
	IGetUserTicketBalance,
	IGetUserTonBalance,
	IRemainigTime,
	claimDailyHome,
	getClaimedBonus,
	getLevel,
	getRemainingTime,
	getTicketsBalance,
	getTonBalance,
} from '@/api/user/balance'
import { api_url } from '@/constants/api-url'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type GetTicketsBalanceResponse = IGetUserTicketBalance
type GetTonBalanceResponse = IGetUserTonBalance
type GetLevelResponse = IGetUserLevel
type ClaimDayliHomeResponse = IClaimDailyBonus
type RemainingTimeResponse = IRemainigTime
type ClaimedBonusResponse = IClaimedBonus

export const balanceApi = createApi({
	reducerPath: 'balanceApi',
	baseQuery: fetchBaseQuery({
		baseUrl: api_url,
	}),
	tagTypes: [
		'headerTicketsBalance',
		'headerTonBalance',
		'headerLevel',
		'headerRemainingTime',
		'headerClaimedBonus',
	],
	endpoints: builder => ({
		getTicketBalance: builder.query<GetTicketsBalanceResponse, void>({
			queryFn: getTicketsBalance,
			providesTags: ['headerTicketsBalance'],
		}),
		getTonBalance: builder.query<GetTonBalanceResponse, void>({
			queryFn: () => {
				const address = localStorage.getItem('ton-wallet-address')
				if (address)
					return getTonBalance({
						userWalletAddress: address,
					})
				else return { data: { balance: '0.0' } }
			},
			providesTags: ['headerTonBalance'],
		}),
		setTicketBalance: builder.mutation<GetTicketsBalanceResponse, void>({
			queryFn: getTicketsBalance,
			invalidatesTags: ['headerTicketsBalance'],
		}),
		getLevel: builder.query<GetLevelResponse, void>({
			queryFn: getLevel,
			providesTags: ['headerLevel'],
		}),
		claimDayliHome: builder.mutation<ClaimDayliHomeResponse, void>({
			queryFn: claimDailyHome,
			invalidatesTags: [
				'headerTicketsBalance',
				'headerRemainingTime',
				'headerClaimedBonus',
			],
		}),
		setTonBalance: builder.mutation<GetTonBalanceResponse, void>({
			queryFn: () => {
				const address = localStorage.getItem('ton-wallet-address')
				if (address)
					return getTonBalance({
						userWalletAddress: address,
					})
				else return { data: { balance: '0.0' } }
			},
			invalidatesTags: ['headerTonBalance'],
		}),
		getRemainingTime: builder.query<RemainingTimeResponse, void>({
			queryFn: getRemainingTime,
			providesTags: ['headerRemainingTime'],
		}),
		getClaimedBonus: builder.query<ClaimedBonusResponse, void>({
			queryFn: getClaimedBonus,
			providesTags: ['headerClaimedBonus'],
		}),
	}),
})

export const {
	useGetTicketBalanceQuery,
	useGetTonBalanceQuery,
	useGetLevelQuery,
	useClaimDayliHomeMutation,
	useGetRemainingTimeQuery,
	useGetClaimedBonusQuery,
	useSetTonBalanceMutation,
	useSetTicketBalanceMutation,
} = balanceApi
