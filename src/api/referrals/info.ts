import axios from 'axios'
import { getChatId } from '../user/chatId'
import { api_url } from '@/constants/api-url'

type Response = {
	currentBonus: number | null
	referralsQnt: number
	totalGames: number
	availableQnt: number
	paidQnt: number
	referralLink: string
}

export const getReferralsInfo = async () => {
	const chat_id = await getChatId()

	return axios.post<Response>(
		'/get_referral_info',
		{ chat_id },
		{ baseURL: api_url }
	)
}
