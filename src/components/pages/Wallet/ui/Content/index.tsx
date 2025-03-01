'use client'
import { FC, useEffect } from 'react'
import { IClassName } from '@/types'
import { cn } from '@/lib'
import Image from 'next/image'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { wallet } from '../../config/image'
import { useSetTonBalanceMutation } from '@/store/api/balance'
import { ConnectedContent } from './ConnectedContent'
import { useAppDispatch } from '@/hooks/redux'
import { setErrorData } from '@/store/reducers/error'
import { Typography } from '@/components/shared'
import { linkWallet } from '@/api/user/wallet'

interface Props extends IClassName {}
const Content: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const userWalletAddress: string = useTonAddress()
	const [updateTonBalanceFn, { isError, error }] = useSetTonBalanceMutation()

	useEffect(() => {
		if (userWalletAddress) {
			if (typeof window !== 'undefined') {
				if (!localStorage.getItem('ton-wallet-address')) {
					localStorage.setItem('ton-wallet-address', userWalletAddress)
					updateTonBalanceFn()
				}
			}
			if (isError) {
				dispatch({
					type: setErrorData.type,
					payload: {
						error,
						hasError: true,
					},
				})
			}
			handleConnect()
		}
	}, [userWalletAddress, updateTonBalanceFn])

	const handleConnect = async () => {
		try {
			// Проверяем, подключился ли кошелек
			if (tonConnectUI.account) {
				// Открываем модал для подключения кошелька

				// Проверяем, подключился ли кошелек
				if (tonConnectUI.account) {
					const addr_full = tonConnectUI.account.address // Полный адрес кошелька TON (0:...)
					const pk_key = tonConnectUI.account.publicKey // Публичный ключ пользователя
					if (typeof addr_full === 'string' && typeof pk_key === 'string') {
						await linkWallet(addr_full, pk_key)
					} else {
						console.error('Адрес кошелька или публичный ключ не определены.')
					}
				} else {
					console.error('Кошелек не подключен.')
				}
			}
		} catch (error) {
			console.error('Ошибка при подключении кошелька:', error)
		}
	}

	const [tonConnectUI] = useTonConnectUI()

	const wrapperCls =
		'px-[16px] h-[283px] bg-white border-black border-[1px] border-solid rounded-[10px] flex justify-center items-center flex-col gap-y-[30px] w-[270px]'
	const connectCls =
		'flex flex-col justify-center items-center bg-white text-black font-bold border-[1px] border-solid border-black rounded-2xl h-[40px] w-[200px] text-[16px] shadow-[2px_3px_3px_2px_#00000080] hover:shadow-none transition-[300]'

	return (
		<>
			{userWalletAddress ? (
				<ConnectedContent className={className} />
			) : (
				<div className={cn(wrapperCls, [className])}>
					<Image {...wallet[0]} className='w-[200px] h-[132px]' />
					<button
						onClick={async () => {
							tonConnectUI.openModal() // Привязка кошелька
						}}
						className={connectCls}
					>
						<Typography size={14} className='font-bold'>
							Connect
						</Typography>
					</button>
				</div>
			)}
		</>
	)
}

export { Content }
