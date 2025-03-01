'use client'

import { IClassName } from '@/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { FC, useEffect } from 'react'
import { logo, lvl, ticket, ton, wallet } from '../config/image'
import Image from 'next/image'
import {
	useGetLevelQuery,
	useGetTicketBalanceQuery,
	useGetTonBalanceQuery,
} from '@/store/api/balance'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
	setLevel,
	setTicketsBalance,
	setTonBalance,
} from '@/store/reducers/balance'
import { question } from '@/config/sharedImage'

const variants = {
	hidden: { opacity: 0, x: '-100%' }, // Сдвиг влево
	visible: { opacity: 1, x: 0 }, // Исходное положение
}
const variants_2 = {
	hidden: { opacity: 0, x: '100%' }, // Сдвиг вправо
	visible: { opacity: 1, x: 0 }, // Исходное положение
}

interface Props extends IClassName {}

const Header: FC<Props> = ({ className }) => {
	const ticketsData = useGetTicketBalanceQuery()
	const tonData = useGetTonBalanceQuery()
	const levelData = useGetLevelQuery()
	const ticketsBalance = useAppSelector(state => state.balance.ticketsBalance)
	const tonBalance = useAppSelector(state => state.balance.tonBalance)
	const level = useAppSelector(state => state.balance.level)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (ticketsData.data && ticketsBalance !== ticketsData.data.total_amount) {
			dispatch(setTicketsBalance({ new: ticketsData.data.total_amount }))
		}
		if (tonData.data && tonBalance !== tonData.data.balance) {
			dispatch(setTonBalance({ new: tonData.data.balance }))
		}
		if (levelData.data && levelData.data.client_level !== level) {
			dispatch(setLevel({ new: levelData.data.client_level }))
		}
	}, [ticketsData, tonData, levelData])

	return (
		<header className={`pt-[30px] ${className}`}>
			<nav className='flex flex-row justify-between items-center gap-[8px]'>
				<motion.div
					initial='hidden'
					animate='visible'
					variants={variants}
					transition={{ duration: 0.5 }}
					className='flex relative flex-2 w-[120px] h-[114px] min-400:w-[148px] min-400:h-[137px]'
				>
					<Link href={'/home'}>
						<Image {...logo[0]} className='h-full object-fit' />
					</Link>

					<div className='absolute top-[-12px] right-[-15px] w-[25px] h-[25.5px] min-400:w-[30px] min-400:h-[30.5px] cursor-pointer'>
						<a
							href='https://hi.dice-paradise.com/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<Image {...question[0]} className='size-[23px]' />
						</a>
					</div>
				</motion.div>
				<motion.div
					initial='hidden'
					animate='visible'
					variants={variants_2}
					transition={{ duration: 0.5 }}
					className='flex-1 flex flex-row gap-[7px]'
				>
					<div className='bg-[#0000005f] flex flex-col justify-center gap-1 py-2 min-400:py-2 px-4 rounded-[10px_0px_0px_10px] h-[95px]'>
						<div className='flex gap-2 items-center'>
							<p className='truncate text-[12px] min-360:text-[13.5px] min-400:text-[14px] font-bold text-white'>
								Total Balance
							</p>
							<Link href={'/wallet'} className='relative w-[18px] h-[14px]'>
								<Image
									{...wallet[0]}
									className='cursor-pointer drop-shadow-[4px_5px_3px_rgba(0,0,0,0.59)] hover:drop-shadow-none transition duration-300'
								/>
							</Link>
						</div>

						<div className='flex gap-2 items-center'>
							<div className='relative w-[17px] h-[14px] min-400:w-[17px] min-400:h-[15.2px]'>
								<Image {...ticket[0]} />
							</div>
							<p className='truncate text-[12px] min-360:text-[13.5px] min-400:text-[14px] font-bold text-white'>
								{ticketsBalance || 0}
							</p>
						</div>

						<div className='flex gap-2 items-center'>
							<div className='relative w-[17px] h-[17px] min-400:w-[17px] min-400:h-[17px]'>
								<Image {...ton[0]} />
							</div>
							<p className='truncate text-[12px] min-360:text-[13.5px] min-400:text-[14px] font-bold text-white'>
								{tonBalance || '0.0'}
							</p>
						</div>
					</div>
					<div className='bg-[#0000005f] flex flex-col gap-y-[4px] justify-center items-center min-400:py-2 w-full'>
						<p className='text-[12px] min-400:text-[14px] truncate font-bold text-white'>
							Lvl. {level}
						</p>
						<div className='translate-x-[3.5px]'>
							<Image className='w-[42px] h-[54px]' {...lvl[0]} />
						</div>
					</div>
				</motion.div>
			</nav>
		</header>
	)
}

export { Header }
