'use client'
import { FC } from 'react'
import { BoostBonusItem } from './BoostBonusItem'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { BoostInfoItem } from './BoostInfoItem'
import Image from 'next/image'
import { processMyRefs } from '@/api/referrals/processRefs'
import {
	showMainSuccessModal,
	showMainErrorModal,
	replaceMainErrorSubtitle,
	replaceMainErrorTitle,
	replaceMainSuccessSubtitle,
} from '@/store/reducers/modals'
import { claimAllBonuses } from '@/api/referrals/claimBonuses'
import { getReferralsInfo } from '@/api/referrals/info'
import { setBoostBonuses } from '@/store/reducers/referralsPage'
import { getTicketsBalance } from '@/api/user/balance'
import { ticketGold } from '@/config/sharedImage'
import { setTicketsBalance } from '@/store/reducers/balance'
import { ticket } from '@/components/widgets/Header/config/image'

interface Props {
	className?: string
}
const Content: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const currentBonus =
		useAppSelector(state => state.referralsPage.boostBonuses.currentBonus) || 0

	const referralsQnt = useAppSelector(
		state => state.referralsPage.boostBonuses.referralsQnt
	)
	const totalGames = useAppSelector(
		state => state.referralsPage.boostBonuses.totalGames
	)
	const availableQnt = useAppSelector(
		state => state.referralsPage.boostBonuses.availableQnt
	)
	const paidQnt = useAppSelector(
		state => state.referralsPage.boostBonuses.paidQnt
	)

	const claimHandle = () => {
		if (availableQnt && availableQnt > 0) {
			claimAllBonuses().then(res => {
				dispatch({
					type: replaceMainSuccessSubtitle.type,
					payload: {
						text: (
							<div className='flex items-center gap-x-[8px]'>
								<div className='relative size-3'>
									<Image {...ticket[0]} />
								</div>
								{availableQnt}
							</div>
						),
					},
				})
				setTimeout(() => {
					dispatch(showMainSuccessModal())
				}, 20)
				getReferralsInfo().then(
					({
						data: {
							availableQnt,
							currentBonus,
							paidQnt,
							referralsQnt,
							totalGames,
						},
					}) => {
						dispatch({
							type: setBoostBonuses.type,
							payload: {
								data: {
									availableQnt,
									currentBonus,
									paidQnt,
									referralsQnt,
									totalGames,
								},
							},
						})
					}
				)
				getTicketsBalance().then(({ data: { total_amount } }) => {
					dispatch({
						type: setTicketsBalance.type,
						payload: total_amount,
					})
				})
			})
		} else {
			dispatch({
				type: replaceMainErrorTitle.type,
				payload: {
					text: 'Error',
				},
			})
			dispatch({
				type: replaceMainErrorSubtitle.type,
				payload: {
					text: 'No tickets for claim',
				},
			})
			dispatch({
				type: showMainErrorModal.type,
			})
		}
	}
	const whoHandleClick = async () => {
		try {
			const response = await processMyRefs()
			if (response.data.success) {
				dispatch(showMainSuccessModal())
			} else {
				console.error('Ошибка из API:', response.data.message)
				dispatch(showMainErrorModal())
			}
			// Открываем ссылку после выполнения запроса
			const WebAppModule = await import('@twa-dev/sdk')
			const WebApp = WebAppModule.default
			if (WebApp) {
				WebApp.openTelegramLink('https://t.me/DiceParadiseBot')
				WebApp.close()
			} else {
				console.error('Telegram WebApp не найден')
			}
		} catch (error) {
			console.error('Ошибка при обработке реферальных ссылок:', error)
			dispatch(showMainErrorModal())
		}
	}

	return (
		<div className={`${className}`}>
			<h2 className=''>BONUSES FROM DICE GAME</h2>
			<ul className='mt-[7px]'>
				<BoostBonusItem
					activePercent={currentBonus}
					percent={{
						current: 0,
						next: 7.5,
					}}
					className=''
				>
					5% - up to 5 referrals;
				</BoostBonusItem>

				<BoostBonusItem
					activePercent={currentBonus}
					percent={{
						current: 7.5,
						next: 8.5,
					}}
					className=''
				>
					7.5% - from 6 to 10 referrals;
				</BoostBonusItem>

				<BoostBonusItem
					activePercent={currentBonus}
					percent={{
						current: 8.5,
						next: 10,
					}}
					className=''
				>
					8.5% - from 11 to 50 referrals;
				</BoostBonusItem>

				<BoostBonusItem
					activePercent={currentBonus}
					percent={{
						current: 10,
						next: 'infinite',
					}}
					className=''
				>
					10% - from 51 referrals;
				</BoostBonusItem>
			</ul>
			<ul className='px-[8px] grid grid-cols-[repeat(2,1fr)] [&>li:nth-child(odd)]:px-[5px] [&>li:nth-child(even)]:pl-[5px] mt-[10px]'>
				<BoostInfoItem
					className=''
					content={
						<>
							<h2>{referralsQnt}</h2>
							<h3
								onClick={whoHandleClick}
								className='text-[13px] underline underline-offset-[4px] underline-[#d8855f]'
							>
								Who?
							</h3>
						</>
					}
					title='No. of referrals:'
				/>
				<BoostInfoItem className='' content={totalGames} title='Total games:' />
				<BoostInfoItem
					className=''
					content={
						<>
							<Image {...ticketGold[0]} />
							{availableQnt}
						</>
					}
					title='Available to pay:'
				/>
				<BoostInfoItem
					className=''
					content={
						<>
							<Image {...ticketGold[0]} />
							{paidQnt}
						</>
					}
					title='Paid amount:'
				/>
			</ul>
			<button
				onClick={claimHandle}
				className='bg-white border-[1px] border-solid border-black rounded-[12px] text-black text-[12px] font-extrabold py-[5px] w-[90%] shadow-[2px_2px_2px_1px_#00000090] hover:shadow-none transition-[300] cursor-pointer flex items-center justify-center mx-auto mt-[10px]'
			>
				Claim
			</button>
		</div>
	)
}

export { Content }
