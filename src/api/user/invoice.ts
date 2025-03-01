import axios from 'axios'
import { api_url } from '@/constants/api-url'
import { getChatId } from './chatId'

interface ResponseType {
	invoice_link: string
}

// create invoice
export const createInvoice = async (stars_count: number) => {
	const user_chat_id = await getChatId()

	return axios.post<ResponseType>(`${api_url}/create_invoice`, {
		chat_id: user_chat_id,
		stars_count,
	})
}
