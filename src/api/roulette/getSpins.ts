import axios from 'axios'
import { api_url } from '@/constants/api-url'
import { getChatId } from '../user/chatId' // Импортируем функцию getChatId

export interface IRouletteSpinResponse {
	prizes?: { name: string }[]
	error?: { type: string; message: string }
}

export const spinRoulette = async ({ spins_qnt }: { spins_qnt: number }) => {
	try {
		const user_chat_id = await getChatId() // Получаем chat_id

		const response = await axios.post<IRouletteSpinResponse>(
			'https://www.dice-paradise.com/roulette_spin',
			{ chat_id: user_chat_id, spins_qnt }, // Используем полученный chat_id
			{
				baseURL: api_url,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		)

		if (response.data.error) {
			throw new Error(response.data.error.message)
		}

		return response.data
	} catch (error: any) {
		throw new Error(
			error?.response?.data?.error?.message || 'Ошибка при прокрутке рулетки'
		)
	}
}
