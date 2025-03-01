import axios from 'axios'
import { api_url } from '@/constants/api-url'
import { getChatId } from '../user/chatId'

export const claimAllBonuses = async () => {
	const chat_id = await getChatId()
	return axios.post<null>(
		'/claim_all_bonuses',
		{ chat_id },
		{ baseURL: api_url }
	)
}
