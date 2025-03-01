'use client'
import { useAppSelector } from '@/hooks/redux'
import Image from 'next/image'
import { FC } from 'react'
import { AddNft } from './AddNft'
import Link from 'next/link'
import { question } from '@/config/sharedImage'

interface Props {
	className?: string
}
const Boost: FC<Props> = ({ className }) => {
	const activatedBoost = useAppSelector(
		state => state.referralsPage.activatedBoost
	)

	return (
		<div
			className={`bg-[#d8855f] relative ${className}`}
			style={{
				borderBottom: '1px solid black',
			}}
		>
			<AddNft className='absolute right-0 top-0 translate-x-[9%]' />
			<div className='relative inline-block'>
				<h2 className=''>REFERRAL BOOST NFT</h2>
				<Link
					rel='noopener noreferrer'
					target='_blank'
					href={
						'https://hi.dice-paradise.com/sut-proekta/rabota-s-referalami-kak-stat-superzvezdoi-dice-paradise'
					}
					className='absolute right-0 top-0 translate-x-[110%] -translate-y-2/4'
				>
					<Image
						{...question[0]}
						className='drop-shadow-[3px_4px_2px_rgba(0,0,0,0.39)]'
					/>
				</Link>
			</div>
			<h3 className='text-[white]'>
				{activatedBoost?.percent
					? `Activated: +${activatedBoost.percent}%`
					: `Not Activated: +${0}%`}
			</h3>
		</div>
	)
}

export { Boost }
