'use client'

import React from 'react'
import Image from 'next/image'

// redux
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
	hideMainSuccessModal,
	replaceMainSuccessImage,
	replaceMainSuccessSubtitle,
	replaceMainSuccessTitle,
} from '@/store/reducers/modals'

// анимация
import { motion } from 'framer-motion'
import { useAppSelector } from '@/hooks/redux'
import { ticketLg } from './images'
const variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1 },
}

const MainSuccess = () => {
	const image = useAppSelector(state => state.modals.main_success_image)
	const isActive = useSelector((state: RootState) => state.modals.main_success)
	const dispatch = useDispatch()
	const title = useAppSelector(state => state.modals.main_success_title)
	const subtitle = useAppSelector(state => state.modals.main_success_subtitle)

	if (!isActive) return <></>

	return (
		// wrapper
		<div className='w-full z-[2] h-[100vh] fixed top-0 left-0 flex items-center justify-center border-none bg-[#0000007a]'>
			{/* modal */}
			<motion.div
				initial='hidden'
				animate='visible'
				exit='hidden'
				variants={variants}
				transition={{ duration: 0.3 }}
				className='w-[calc(100%-40px)] max-w-[235px] rounded-[10px_10px_10px_10px] overflow-hidden border-[1.5px] border-black bg-white'
			>
				<div className='flex flex-col justify-center items-center gap-2 p-4'>
					<p className='text-black font-bold'>{title || 'Claim Success'}</p>
					<div className='relative w-full flex justify-center'>
						{image || <Image {...ticketLg[0]} className='size-[60px]' />}
					</div>
				</div>

				<div className='bg-[#254858] w-full flex justify-center items-center gap-2 py-1 border-none border-t border-b border-black'>
					<p className='text-white font-bold text-[15px]'>
						{subtitle?.toString() === '0' || subtitle
							? subtitle
							: 'tickets claimed'}
					</p>
				</div>

				<div className='bg-white w-full p-3'>
					<button
						onClick={(): void => {
							dispatch({
								type: replaceMainSuccessTitle.type,
								payload: { text: undefined },
							})
							dispatch({
								type: replaceMainSuccessSubtitle.type,
								payload: { text: undefined },
							})
							dispatch({
								type: replaceMainSuccessImage.type,
								payload: {
									image: undefined,
								},
							})

							dispatch(hideMainSuccessModal())
						}}
						className='w-full flex justify-center items-center font-bold border-[1px] border-solid border-black rounded-lg p-1 text-black cursor-pointer shadow-[2px_3px_3px_2px_#00000080] transition-[300] hover:shadow-none'
					>
						OK
					</button>
				</div>
			</motion.div>
		</div>
	)
}

export default MainSuccess
