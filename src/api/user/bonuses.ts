import axios from 'axios'
import { api_url } from '@/constants/api-url'
import { getChatId } from './chatId'

type IClaimBonusResponse = undefined

export const claimBonus = async () => {
	const chat_id = await getChatId()

	return axios.post<IClaimBonusResponse>(
		'/claim_bonus',
		{
			chat_id,
		},
		{ baseURL: api_url }
	)
}

export type IGetUserBonusResponse =
	| {
			status: 'streak_continue' | 'streak_reset'
			message: string
			currentDay: number
			prediction?: string
	  }
	| {
			status: 'visited_today'
			message: string
			currentDay: number
			prediction?: never
	  }

export const getUserBonus = async (language: 'rus' | 'eng' = 'rus') => {
	const chat_id = await getChatId()
	return axios.post<IGetUserBonusResponse>(
		'/get_user_bonus',
		{
			chat_id,
			language,
		},
		{
			baseURL: api_url,
		}
	)
}
