'use client'
import { centerEllipsesForStr } from '@/components/pages/Wallet/lib/centerEllipsesForStr'
import { Typography } from '@/components/shared'
import { cn } from '@/lib'
import { IClassName } from '@/types'
import { useTonAddress } from '@tonconnect/ui-react'
import { FC } from 'react'

interface Props extends IClassName {}
const WalletAddress: FC<Props> = ({ className }) => {
	const wrapperCls = 'py-[8px] bg-[rgba(37,72,88,1)] text-white text-center'
	const userWalletAddress: string = useTonAddress()

	return (
		<div className={cn(wrapperCls, [className])}>
			<Typography size={14} className='font-bold'>
				Your wallet address:
			</Typography>
			<Typography size={14} className='font-bold mx-auto'>
				{centerEllipsesForStr({
					str: userWalletAddress,
					maxSymbols: { end: 8, start: 7, dotes: 6 },
				}) || 'Ton address not found'}
			</Typography>
		</div>
	)
}

export { WalletAddress }
