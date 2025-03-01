// @/services/api/user/refs/process-my-refs.tsx
import axios from 'axios'
import { api_url } from '@/constants/api-url'
import { getChatId } from '../user/chatId'

interface ProcessMyRefsResponseType {
	success: boolean
	message: string
	// Добавьте другие поля, которые возвращает ваш API
}
// Запрос для обработки реферальных ссылок
export const processMyRefs = async () => {
	const user_chat_id = await getChatId()
	return axios.post<ProcessMyRefsResponseType>(`${api_url}/process_my_refs`, {
		chat_id: user_chat_id,
	})
}
