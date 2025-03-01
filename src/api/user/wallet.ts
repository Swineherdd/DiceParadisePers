import WebApp from '@twa-dev/sdk'
import axios from 'axios'
import { api_url } from '@/constants/api-url'

interface UnlinkWalletResponseType {
	status: string
	message?: string
}

interface UnlinkWalletData {
	cid: number
	addr_short: string
	addr_full: string
	pk_key: string
}
/**
 * Функция для получения chat_id пользователя.
 * @returns Идентификатор чата пользователя.
 */
const getUserChatId = async (): Promise<number> => {
	if (typeof window !== 'undefined') {
		return WebApp.initDataUnsafe?.user?.id || 132
	}
	return 132
}
/**
 * Функция для генерации короткого адреса кошелька.
 * @param userWalletAddress - Полный адрес кошелька TON.
 * @returns Короткий формат адреса кошелька.
 */
const generateShortAddress = (userWalletAddress: string): string => {
	const part1 = userWalletAddress.slice(0, 5)
	const part2 = userWalletAddress.slice(-8)
	return `${part1}...${part2}`
}
/**
 * Функция для отвязки кошелька.
 * @param addr_full - Полный адрес кошелька TON.
 * @param pk_key - Публичный ключ пользователя.
 * @returns Объект с результатом операции.
 */
export const unlinkWallet = async (
	addr_full: string,
	pk_key: string
): Promise<UnlinkWalletResponseType> => {
	try {
		const cid = await getUserChatId()
		const addr_short = generateShortAddress(addr_full)
		const data: UnlinkWalletData = { cid, addr_short, addr_full, pk_key }
		const response = await axios.post(`${api_url}/unbind_wallet`, data)
		return response.data
	} catch (error) {
		console.error('Ошибка при отвязке кошелька:', error)
		return { status: 'failed', message: 'Не удалось отвязать кошелек' }
	}
}

interface LinkWalletResponseType {
	status: string
	message?: string
}
interface LinkWalletData {
	cid: number
	addr_short: string
	addr_full: string
	pk_key: string
}
/**
 * Функция для привязки кошелька.
 * @param addr_full - Полный адрес кошелька TON.
 * @param pk_key - Публичный ключ пользователя.
 * @returns Объект с результатом операции.
 */
export const linkWallet = async (
	addr_full: string,
	pk_key: string
): Promise<LinkWalletResponseType> => {
	try {
		const cid = await getUserChatId()
		const addr_short = generateShortAddress(addr_full)
		const data: LinkWalletData = { cid, addr_short, addr_full, pk_key }
		const response = await axios.post(`${api_url}/bind_wallet`, data)
		return response.data
	} catch (error) {
		console.error('Ошибка при привязке кошелька:', error)
		return { status: 'failed', message: 'Не удалось привязать кошелек' }
	}
}
