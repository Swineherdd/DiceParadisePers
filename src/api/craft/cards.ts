import { api_url } from '@/constants/api-url'
import axios from 'axios'
import { getChatId } from '../user/chatId'

export type Response = {
	id: number
	name: string
	image: string
}[]

export const getCraftCards = async () => {
	const chat_id = await getChatId()
	return axios.post<Response>(
		'/get_current_nfts',
		{
			chat_id,
		},
		{ baseURL: api_url }
	)
}
