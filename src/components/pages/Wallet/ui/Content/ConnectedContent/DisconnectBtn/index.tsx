import { Typography } from '@/components/shared'
import { cn } from '@/lib'
import { unlinkWallet } from '@/api/user/wallet'
import { useSetTonBalanceMutation } from '@/store/api/balance'
import { IClassName } from '@/types'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { FC } from 'react'

interface Props extends IClassName {}
const DisconnectBtn: FC<Props> = ({ className }) => {
	const [updateTonBalance] = useSetTonBalanceMutation()
	const [tonConnectUI] = useTonConnectUI()
	const handleUnlinkWallet = async () => {
		try {
			if (tonConnectUI && tonConnectUI.account) {
				const addr_full = tonConnectUI.account.address // Полный адрес кошелька TON (0:...)
				const pk_key = tonConnectUI.account.publicKey // Публичный ключ пользователя
				if (typeof addr_full === 'string' && typeof pk_key === 'string') {
					await unlinkWallet(addr_full, pk_key)
				} else {
					console.error('Адрес кошелька или публичный ключ не определены.')
				}
			} else {
				console.error(
					'TON Connect UI не инициализирован или аккаунт отсутствует.'
				)
			}
		} catch (error) {
			console.error('Ошибка при вызове unlinkWallet:', error)
		}
	}
	const handleDisconnect = async () => {
		try {
			if (tonConnectUI) {
				await handleUnlinkWallet() // Отвязка кошелька при отключении
				await tonConnectUI.disconnect()

				localStorage.removeItem('ton-wallet-address')
				updateTonBalance()
			} else {
				console.error(
					'TON Connect UI не инициализирован или аккаунт отсутствует.'
				)
			}
		} catch (error) {
			console.error('Ошибка при отключении TON Connect:', error)
		}
	}
	return (
		<button
			className={cn(
				'w-[230px] border-[1px] border-solid border-black py-[8px] cursor-pointer shadow-[2px_3px_3px_2px_#00000080] hover:shadow-none transition-[300] rounded-lg mx-auto block mt-[8px] mb-[20px]',
				[className]
			)}
			onClick={handleDisconnect}
		>
			<Typography size={14} className='font-bold'>
				DISCONNECT
			</Typography>
		</button>
	)
}

export { DisconnectBtn }
