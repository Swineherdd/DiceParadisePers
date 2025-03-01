'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
// telegram
import WebApp from '@twa-dev/sdk'
import { beginCell } from 'ton'

// redux
import { RootState } from '@/store/store'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
	hideBuyTicketModal,
	replaceMainErrorSubtitle,
	replaceMainErrorTitle,
	replaceMainSuccessSubtitle,
	replaceMainSuccessTitle,
	showMainErrorModal,
	showMainSuccessModal,
} from '@/store/reducers/modals'

// api & hooks
import { createInvoice } from '@/api/user/invoice'
import { getTonPrice } from '@/api/user/balance'

// анимация
import { motion } from 'framer-motion'
const variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1 },
}
import { ticket } from '@/components/pages/Home/config/image'

// TON Payment
const TON_TO_NANOTON = 1000000000
import { useTonConnectUI } from '@tonconnect/ui-react'
import { ticketGoldFill } from '@/config/sharedImage'
import {
	buyTicketBackground,
	closeIcon,
	goldTicketIconQnt,
	specialOffers,
	starIcon,
	tonIcon,
} from './images'
import { useSetTicketBalanceMutation } from '@/store/api/balance'

const BuyTicketModal = () => {
	const [updateTickets] = useSetTicketBalanceMutation()
	const router = useRouter()
	const isActive = useSelector((state: RootState) => state.modals.buy_ticket)
	const dispatch = useDispatch()

	// *PAYMENT
	const [paymentType, setPaymentType] = React.useState<'tg-stars' | 'ton'>(
		'tg-stars'
	)
	const [ticketAmount, setTicketAmount] = React.useState<string>('0')
	const [priceForTicketBuy, setPriceForTicketBuy] = React.useState<{
		ton: string
		stars: string
	}>({ ton: '0', stars: '1' })
	const [tonPrice, setTonPrice] = React.useState<string>('5.655')

	React.useEffect(() => {
		getTonPrice()
			.then(response => {
				if (!response.data.price) return null // Исправлено
				setTonPrice(response.data.price) // Исправлено
			})
			.catch(error => {
				console.error('Error fetching TON price:', error)
			})
	}, [])

	const handleCreateInvoice = () => {
		return new Promise((res, rej) => {
			const starsCount = Math.ceil(Number(priceForTicketBuy.stars))
			createInvoice(starsCount)
				.then(response => {
					window.open(response.data.invoice_link, '_blank')
					setPriceForTicketBuy({ ton: '0', stars: '1' })
					setTicketAmount('1')
					res(undefined)
				})
				.catch(error => {
					console.error('Error creating invoice:', error)
					// Можно добавить обработку ошибки, например, показать уведомление пользователю
					rej('Error creating invoice:')
				})
		})
	}
	const [tonConnectUi] = useTonConnectUI()
	// payload generator
	// Payload generator
	async function encrypt(
		number: number,
		key1: number,
		key2: number
	): Promise<number> {
		const encrypted = number * key1 + key2
		return encrypted
	}
	function createPayload(message: string): string {
		const body = beginCell()
			.storeUint(0, 32) // 32 нуля указывают на то, что будет следовать текстовый комментарий
			.storeStringTail(message) // Ваш комментарий, включая эмодзи
			.endCell()

		return body.toBoc().toString('base64')
	}

	// Buy tickets handler
	const handleBuyTicket = async () => {
		if (+ticketAmount < 50) {
			dispatch({
				type: replaceMainErrorTitle.type,
				payload: {
					text: 'Error',
				},
			})
			dispatch({
				type: replaceMainErrorSubtitle.type,
				payload: {
					text: (
						<div className='flex items-center justify-center gap-x-[1px]'>
							<p>Minimal quantity 50</p>
							<Image className='w-[18px]' {...goldTicketIconQnt[0]} />
						</div>
					),
				},
			})
			dispatch({ type: showMainErrorModal.type })
		} else {
			try {
				if (paymentType === 'tg-stars') {
					handleCreateInvoice().catch(error => {
						console.error('HandleBuyTicket error:', error)
						dispatch({
							type: replaceMainErrorTitle.type,
							payload: { text: 'Error' },
						})
						dispatch({
							type: replaceMainErrorSubtitle.type,
							payload: { text: 'Tickets not purchased' },
						})
						dispatch({
							type: showMainErrorModal.type,
						})
						updateTickets()
					})

					return
				}
				// Получение user_id
				if (paymentType === 'ton') {
					if (!tonPrice) {
						console.error('TON price is not available')
						return
					}
					// Получение user_id
					let chat_id = 123
					if (typeof window !== 'undefined') {
						chat_id = WebApp.initDataUnsafe?.user?.id || 123
					}
					// Шифрование номера
					const encryptedNumber = await encrypt(chat_id, 7, 11)
					console.log('Encrypted Number:', encryptedNumber)
					// Формирование payload
					const payload = createPayload(
						`Pay for DiceParadice ${ticketAmount} 🎫 #${encryptedNumber}`
					)

					console.log('Payload:', payload)
					// Отправка транзакции
					tonConnectUi
						.sendTransaction({
							validUntil: Math.floor(Date.now() / 1000) + 600,
							messages: [
								{
									address: 'UQBdhcj_4cjGmxWseN4-U7v1ObSTjAOmabMtcO0M2e8rx2l9',
									amount: (
										Number(priceForTicketBuy.ton) * TON_TO_NANOTON
									).toString(),
									stateInit:
										'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==',
									payload: payload,
								},
							],
						})
						.then(() => {
							updateTickets()
							console.log('Transaction successful')
							setPriceForTicketBuy({ ton: '0', stars: '1' })
							setTicketAmount('1')
							dispatch({
								type: replaceMainSuccessTitle.type,
								payload: {
									text: 'Success',
								},
							})
							dispatch({
								type: replaceMainSuccessSubtitle.type,
								payload: {
									text: 'Please wait 5 min.',
								},
							})
							dispatch({ type: showMainSuccessModal.type })
						})
				}
			} catch (error) {
				console.error('HandleBuyTicket error:', error)
				dispatch({
					type: replaceMainErrorTitle.type,
					payload: { text: 'Error' },
				})
				dispatch({
					type: replaceMainErrorSubtitle.type,
					payload: { text: 'Something went wrong' },
				})
				dispatch({
					type: showMainErrorModal.type,
				})
			}
		}
	}

	if (!isActive) return <></>
	return (
		// wrapper
		<div className='w-full h-[100vh] fixed top-0 left-0 z-[1] flex items-start pt-[90px] min-400:pt-[100px] justify-center border-none bg-[#0000007a]'>
			{/* modal */}
			<motion.div
				initial='hidden'
				animate='visible'
				exit='hidden'
				variants={variants}
				transition={{ duration: 0.3 }}
				className='w-[calc(100%-24px)] max-w-[380px] rounded-2xl overflow-hidden border-[1px] border-black'
			>
				{/* header */}
				<div className='h-8 w-full flex flex-row justify-between bg-[#bfd4ea] border-b-[1.5px] border-black p-6 overflow-hidden'>
					<div className='flex flex-row gap-[6px] items-start mt-[-8px]'>
						<p className='text-[16px] font-bold text-black'>Buy tickets</p>
						<Image {...ticket[0]} className='mt-[2px] w-[17px] h-auto' />
					</div>
					<div
						onClick={(): void => {
							dispatch(hideBuyTicketModal())
						}}
						className='relative size-[14px] mt-[-12px] mr-[-12px] cursor-pointer'
					>
						<Image
							{...closeIcon[0]}
							className='hover:scale-[0.9] transition-[300]'
						/>
					</div>
				</div>

				{/* body */}
				<div className='relative flex items-center justify-center pt-6 pb-[35px] px-2 min-400:px-6'>
					{/* background */}
					<Image
						{...buyTicketBackground[0]}
						className='object-cover z-[0] absolute top-0 left-0 h-full'
					/>
					<div className='w-[310px] min-400:w-full'>
						<div className='relative z-[1] flex flex-row justify-between gap-5 w-full px-[15px]'>
							<button
								onClick={() => {
									setPaymentType('ton')
									setTicketAmount('0')
									setPriceForTicketBuy({ ton: '0', stars: '' })
								}}
								className={`w-full flex flex-row justify-center items-center gap-1 bg-white border-[1.5px] border-black border-solid rounded-xl py-2 px-2 min-400:px-3 ${
									paymentType == 'tg-stars' &&
									'shadow-[2px_3px_3px_2px_#00000080]'
								} transition-[300] cursor-pointer`}
							>
								<p className='text-black font-bold text-[15px]'>Ton pay</p>
								<div className='relative size-6'>
									<Image {...tonIcon[0]} />
								</div>
							</button>
							<button
								onClick={() => {
									setPaymentType('tg-stars')
									setTicketAmount('0')
									setPriceForTicketBuy({ ton: '0', stars: '0' })
								}}
								className={`w-full flex flex-row justify-center items-center gap-1 bg-white border-[1.5px] border-black border-solid  rounded-xl py-2 px-2 min-400:px-3 ${
									paymentType == 'ton' && 'shadow-[2px_3px_3px_2px_#00000080]'
								} transition-[300] cursor-pointer`}
							>
								<p className='text-black font-bold text-[15px]'>TG stars</p>
								<div className='relative size-6'>
									<Image {...starIcon[0]} />
								</div>
							</button>
						</div>
						<div className='relative z-[1] flex justify-center items-center w-full pt-7 px-[15px]'>
							{/* black background */}
							<div className='w-full flex flex-col items-center gap-5 bg-[#000000c0] p-6 rounded-[10px_10px_10px_10px]'>
								<div className='w-full flex flex-col justify-center items-center gap-5'>
									<div className='w-full flex flex-row justify-between items-center gap-1 min-400:gap-3'>
										<div className='flex flex-row justify-center items-center gap-1 bg-white rounded-xl py-1 px-[16px] w-[110px] h-[33px]'>
											<input
												value={ticketAmount}
												className='w-[30px] text-[15px] flex-1 text-center text-black font-bold border-none outline-none placeholder:text-black placeholder:font-bold'
												placeholder='1'
												onChange={e => {
													setTicketAmount(e.target.value)
													if (paymentType == 'tg-stars') {
														if (Number(e.target.value) == 10_000)
															setTicketAmount('10200')
														if (Number(e.target.value) == 100_000)
															setTicketAmount('105000')
														setPriceForTicketBuy({
															...priceForTicketBuy,
															stars: (Number(e.target.value) * 0.69).toFixed(0),
														})
													}
													if (paymentType == 'ton') {
														if (Number(e.target.value) == 10_000)
															setTicketAmount('10200')
														if (Number(e.target.value) == 100_000)
															setTicketAmount('105000')
														setPriceForTicketBuy({
															...priceForTicketBuy,
															ton: (
																(Number(e.target.value) * 0.01) /
																Number(tonPrice)
															).toFixed(2),
														})
													}
													e.target.style.width = 'auto'
													e.target.style.width = `${e.target.scrollHeight}px`
												}}
												type='number'
											/>
											<div className='relative flex-2'>
												<Image
													{...ticketGoldFill[0]}
													className='w-[20px] h-auto -translate-y-[2px]'
												/>
											</div>
										</div>
										<span className='font-extrabold'>=</span>
										<div className='flex flex-row justify-center items-center gap-1 bg-white rounded-xl py-1 px-[16px] w-[110px] h-[33px]'>
											<input
												value={
													paymentType == 'tg-stars'
														? priceForTicketBuy.stars
														: priceForTicketBuy.ton
												}
												className='w-[30px] text-[15px] flex-1 text-center text-black font-bold border-none outline-none placeholder:text-black placeholder:font-bold'
												placeholder='1'
												onChange={e => {
													if (paymentType == 'tg-stars') {
														setPriceForTicketBuy({
															...priceForTicketBuy,
															stars: e.target.value,
														})
														setTicketAmount(
															Math.floor(Number(e.target.value) / 0.69).toFixed(
																0
															)
														)
													}
													if (paymentType == 'ton') {
														setPriceForTicketBuy({
															...priceForTicketBuy,
															ton: e.target.value,
														})
														setTicketAmount(
															Math.floor(
																(Number(e.target.value) / 0.01) *
																	Number(tonPrice)
															).toFixed(0)
														)
													}
													e.target.style.width = 'auto'
													e.target.style.width = `${e.target.scrollHeight}px`
												}}
												type='number'
											/>
											{paymentType == 'ton' ? (
												<div className='relative flex-shrink-0'>
													<Image {...tonIcon[0]} className='w-[20px] h-auto' />
												</div>
											) : (
												<div className='relative flex-shrink-0'>
													<Image {...starIcon[0]} className='w-[20px] h-auto' />
												</div>
											)}
										</div>
									</div>
									<button
										onClick={handleBuyTicket}
										className='w-fit capitalize bg-[#e09804] border-[1.5px] border-black rounded-[10px] text-black py-[6px] px-10 text-[12px] font-[700] cursor-pointer'
									>
										BUY TICKETS
									</button>
									<div className='h-[130px] min-400:h-[120px] mr-[-18px] min-400:mr-[-19px]'>
										<div className='relative w-[290px] h-[170px] min-400:w-[310px] min-400:h-[170px]'>
											{/* 10k */}
											<button
												className='absolute opacity-0 left-[17px] top-[42px] w-[140px] h-[50px] z-[2]'
												onClick={() => {
													setTicketAmount('10200')
													if (paymentType == 'tg-stars') {
														setPriceForTicketBuy({
															...priceForTicketBuy,
															stars: (Number('10000') * 0.69).toFixed(0),
														})
													}
													if (paymentType == 'ton') {
														setPriceForTicketBuy({
															...priceForTicketBuy,
															ton: (
																(Number('10000') * 0.01) /
																Number(tonPrice)
															).toFixed(2),
														})
													}
												}}
											/>
											{/* 100k */}
											<button
												className='absolute opacity-0 left-[17px] top-[92px] w-[140px] h-[50px] z-[2]'
												onClick={() => {
													setTicketAmount('105000')
													if (paymentType == 'tg-stars') {
														setPriceForTicketBuy({
															...priceForTicketBuy,
															stars: (Number('100000') * 0.69).toFixed(0),
														})
													}
													if (paymentType == 'ton') {
														setPriceForTicketBuy({
															...priceForTicketBuy,
															ton: (
																(Number('100000') * 0.01) /
																Number(tonPrice)
															).toFixed(2),
														})
													}
												}}
											/>
											<Image {...specialOffers[0]} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default BuyTicketModal
