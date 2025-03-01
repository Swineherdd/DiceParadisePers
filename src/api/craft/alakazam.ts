import { api_url } from '@/constants/api-url'
import { TCardData } from '@/store/reducers/craft'
import axios from 'axios'
import { getChatId } from '../user/chatId'

type AllPropertiesToNever<T> = {
	[K in keyof T]: never
}
export type TAlakazamResponse =
	| (Partial<Omit<TCardData, 'id'>> & { error?: never })
	| (AllPropertiesToNever<Partial<Omit<TCardData, 'id'>>> & {
			error?: {
				type: 'noRecipe' | 'nftNotAvailable'
			}
	  })

export const alakazam = async ({ nfts }: { nfts: TCardData[] }) => {
	const chat_id = await getChatId()

	return axios.post<TAlakazamResponse>(
		'/craft_nfts',
		{
			nfts,
			chat_id,
		},
		{ baseURL: api_url }
	)
}
