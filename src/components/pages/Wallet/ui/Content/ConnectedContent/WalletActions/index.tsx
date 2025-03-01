'use client'
import { Typography } from '@/components/shared'
import { ticketGoldFill } from '@/config/sharedImage'
import { useAppDispatch } from '@/hooks/redux'
import { cn } from '@/lib'
import { showBuyTicketModal } from '@/store/reducers/modals'
import { IClassName } from '@/types'
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { connectedBackground } from '@/components/pages/Wallet/config/image'

interface Props extends IClassName {}
const WalletActions: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const wrapperCls =
		'overflow-hidden flex flex-col gap-y-[40px] p-[20px] relative items-center'
	const btnCls =
		'w-[230px] flex justify-center items-start gap-1 bg-white border-[1px] border-solid rounded-lg py-[8px] cursor-pointer shadow-[2px_3px_3px_2px_#00000080] border-black hover:shadow-none transition-[300] disabled:border-[#cac8c8] disabled:shadow-[4px_4px_5px_0px_#00000080] [&:disabled>p]:text-[rgb(113,112,112,100%)] relative z-[2] [&>img]:w-[17px] [&>img]:h-auto'
	const handleBuy = () => {
		dispatch(showBuyTicketModal())
	}
	const handleSell = () => {}
	return (
		<div className={cn(wrapperCls, [className])}>
			<button className={cn(btnCls)} onClick={handleBuy}>
				<Typography size={12} className='font-bold text-[#c11125]'>
					BUY
				</Typography>
				<Image {...ticketGoldFill[0]} />
			</button>
			<button className={cn(btnCls)} onClick={handleSell} disabled>
				<Typography size={12} className='font-bold'>
					SELL
				</Typography>
				<Image {...ticketGoldFill[0]} />
			</button>
			<Link
				href='https://getgems.io/diceparadise'
				target='_blank'
				className={cn(btnCls)}
			>
				<Typography size={12} className='font-bold'>
					NFT on GETGEMS
				</Typography>
				<Image {...ticketGoldFill[0]} />
			</Link>
			<Image {...connectedBackground[0]} className='absolute inset-0' />
		</div>
	)
}

export { WalletActions }
