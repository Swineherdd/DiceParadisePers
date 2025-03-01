import axios from 'axios'
import { api_url } from '@/constants/api-url'
import { getChatId } from '../user/chatId'

type Response = {
	bonus_percent: number
	image: string
	message: string
}

export const applyNft = async (nft_name: string) => {
	const chat_id = await getChatId()
	return axios.post<Response>(
		'/apply_nft',
		{ chat_id, nft_name },
		{ baseURL: api_url }
	)
}
