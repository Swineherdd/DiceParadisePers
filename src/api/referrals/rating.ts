import { api_url } from '@/constants/api-url'
import { TTeamsRating, TReferralsRating } from '@/store/reducers/referralsPage'
import axios from 'axios'
import { getChatId } from '@/api/user/chatId'

export const getReferralsRating = () => {
	return axios.get<
		(TReferralsRating & {
			nickname: string
		})[]
	>('/get_top_referrers', { baseURL: api_url })
}
export const getTeamsRating = () => {
	return axios.get<
		(TTeamsRating & {
			nickname: string
		})[]
	>('/get_top_teams', { baseURL: api_url })
}

export const getYouReferralsRating = async () => {
	const chat_id = await getChatId()
	return axios.post<TReferralsRating | null>(
		'/get_user_rank',
		{ chat_id },
		{ baseURL: api_url }
	)
}
export const getYouTeamsRating = async () => {
	const chat_id = await getChatId()
	return axios.post<TTeamsRating | null>(
		'get_user_team_stats',
		{ chat_id },
		{ baseURL: api_url }
	)
}
