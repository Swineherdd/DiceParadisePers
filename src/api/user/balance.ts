import axios from 'axios'
import { api_url } from '@/constants/api-url'
import { getChatId } from './chatId'

export interface IGetUserTicketBalance {
	total_amount: number
}
export const getTicketsBalance = async () => {
	const user_chat_id = await getChatId()
	return axios.post<IGetUserTicketBalance>(
		'/get_balance_sum',
		{
			chat_id: user_chat_id,
		},
		{ baseURL: api_url }
	)
}

export interface IGetUserTonBalance {
	balance: string
}
export const getTonBalance = async ({
	userWalletAddress,
}: {
	userWalletAddress: string
}) => {
	return axios.post<IGetUserTonBalance>(
		'/get_ton_balance',
		{
			account_id: userWalletAddress,
		},
		{ baseURL: api_url }
	)
}

export interface IGetUserLevel {
	client_level: number
}
export const getLevel = async () => {
	const user_chat_id = await getChatId()
	return axios.post<IGetUserLevel>(
		'/get_client_level',
		{ chat_id: user_chat_id },
		{ baseURL: api_url }
	)
}

export interface IClaimDailyBonus {
	message: string
	wait_time_seconds: number
	error: boolean
	total_bonus: number
}
export const claimDailyHome = async () => {
	const user_chat_id = await getChatId()
	return axios.post<IClaimDailyBonus>(
		'/handle_button_click',
		{ chat_id: user_chat_id },
		{ baseURL: api_url }
	)
}

export interface IRemainigTime {
	message: string
	wait_time_seconds: number
}
export const getRemainingTime = async () => {
	const user_chat_id = await getChatId()
	return axios.post<IRemainigTime>(
		'/get_remaining_time',
		{ chat_id: user_chat_id },
		{ baseURL: api_url }
	)
}

export interface IClaimedBonus {
	total_unclaimed_bonus: number
}
export const getClaimedBonus = async () => {
	const user_chat_id = await getChatId()
	return axios.post<IClaimedBonus>(
		'/get_unclaimed_bonus',
		{ chat_id: user_chat_id },
		{ baseURL: api_url }
	)
}

interface IGetTonPrice {
	price: string
}
export const getTonPrice = async () => {
	return axios.get<IGetTonPrice>('/get_ton_price', { baseURL: api_url })
}
