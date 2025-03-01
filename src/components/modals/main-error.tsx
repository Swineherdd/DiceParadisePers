'use client'
import React, { CSSProperties, FC, MouseEventHandler } from 'react'
import Image from 'next/image' // redux
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import {
	hideMainErrorModal,
	replaceMainErrorSubtitle,
	replaceMainErrorTitle,
} from '@/store/reducers/modals'

// анимация
import { motion } from 'framer-motion'
import { useAppSelector } from '@/hooks/redux'
import { error } from './images'
const variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1 },
}
const MainError: FC<{
	okOnClick?: MouseEventHandler
	style?: CSSProperties
}> = ({ okOnClick, style }) => {
	const remainingTime = useAppSelector(state => state.balance.remainingTime)
	const isActive = useSelector((state: RootState) => state.modals.main_error)
	const dispatch = useDispatch()
	const mainErrorTitle = useAppSelector(state => state.modals.main_error_title)
	const mainErrorSubtitle = useAppSelector(
		state => state.modals.main_error_subtitle
	)
	// get ticket claim remaining time

	if (!isActive) return <></>
	return (
		// wrapper
		<div
			className='w-full h-[100vh] fixed top-0 left-0 z-[2] flex items-center justify-center border-none bg-[#0000007a]'
			style={style}
		>
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
					<p className='text-black font-bold'>
						{mainErrorTitle || 'Claim Failure'}
					</p>
					<div className='relative size-20'>
						<Image {...error[0]} />
					</div>
				</div>
				<div className='bg-[#ec6e6d] w-full flex justify-center items-center py-1 border-none border-t border-b border-black'>
					<p
						className='text-white font-bold text-[15px]'
						style={{
							whiteSpace: 'nowrap',
						}}
					>
						{mainErrorSubtitle ||
							`Wait ${Math.floor(remainingTime / 3600)}h.
						${Math.floor((remainingTime % 3600) / 60)}m.`}
					</p>
				</div>
				<div className='bg-white w-full p-3'>
					<button
						onClick={(e): void => {
							dispatch({
								type: replaceMainErrorTitle.type,
								payload: { text: undefined },
							})
							dispatch({
								type: replaceMainErrorSubtitle.type,
								payload: { text: undefined },
							})
							dispatch(hideMainErrorModal())

							// eslint-disable-next-line @typescript-eslint/no-unused-expressions
							okOnClick && okOnClick(e)
						}}
						className='w-full flex justify-center items-center border-[1px] border-solid font-bold border-black rounded-lg p-1 text-black cursor-pointer shadow-[2px_3px_3px_2px_#00000080] transition-[300] hover:shadow-none'
					>
						OK
					</button>
				</div>
			</motion.div>
		</div>
	)
}
export default MainError
