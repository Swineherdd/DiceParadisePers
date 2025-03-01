import { api_url } from '@/constants/api-url'
import axios from 'axios'
import { getChatId } from '@/api/user/chatId'

type GetHeadNftResponse = {
	image: string
	name: string
	id: number
}[]

export const getHeadNft = async () => {
	const chat_id = await getChatId()
	return axios.post<GetHeadNftResponse>(
		'/get_dice_nfts',
		{ chat_id },
		{ baseURL: api_url }
	)
}

type GetDiceNftResponse = {
	image: string
	percent: number
	name: string
} | null

export const getDiceNft = async () => {
	const chat_id = await getChatId()
	return axios.post<GetDiceNftResponse>(
		'/get_dice_nft',
		{ chat_id },
		{ baseURL: api_url }
	)
}
