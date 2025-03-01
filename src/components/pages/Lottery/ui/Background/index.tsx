'use client'
import Image from 'next/image'
import { FC } from 'react'
import { lotteryBg } from '../../config/image'
import { question } from '@/config/sharedImage'

interface Props {
	className?: string
}
const Background: FC<Props> = ({ className }) => {
	return (
		<div className={`absolute right-[10px] top-[10px] ${className}`}>
			<Image
				{...lotteryBg[0]}
				className='translate-y-[5px] w-[160px] h-[159px]'
			/>
			<button
				onClick={() => {
					window.open(
						'https://hi.dice-paradise.com/nft-proekta/kraft-nft',
						'_blank'
					)
				}}
			>
				<Image
					{...question[0]}
					className='size-[20px] absolute right-0 top-0 drop-shadow-[3px_4px_2px_rgba(0,0,0,0.39)]'
				/>
			</button>
		</div>
	)
}

export { Background }
