'use client'
import { useAppSelector } from '@/hooks/redux'
import Image from 'next/image'
import { FC } from 'react'
import { copy } from '../../config/images'

interface Props {
	className?: string
}
const ReferralLink: FC<Props> = ({ className }) => {
	const referralLink = useAppSelector(state => state.referralsPage.referralLink)
	return (
		<div className={`bg-[white] ${className}`}>
			<h2 className=''>YOUR REFERRAL LINK</h2>
			<div className='mt-[10px] flex items-center gap-x-[1px] py-[4px] px-[8px] border-solid border-[1px] border-black rounded-[12px]'>
				<h3 className='grow-[1] text-[#93979b] whitespace-nowrap overflow-hidden text-ellipsis'>
					{referralLink}
				</h3>
				<button
					className=''
					onClick={() => {
						if (typeof window !== undefined)
							window.navigator.clipboard.writeText(referralLink)
					}}
				>
					<Image
						{...copy[0]}
						className='min-w-[16px] min-h-[18px] active:opacity-70 active:scale-[0.95] duration-[120ms]'
					/>
				</button>
			</div>
		</div>
	)
}

export { ReferralLink }
