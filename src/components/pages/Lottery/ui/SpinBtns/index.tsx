'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setCurrentSpins, setIsSpin } from '@/store/reducers/lottery'
import Image from 'next/image'
import { FC, useCallback } from 'react'
import cls from './index.module.css'
import { magicHat } from '../../config/image'

interface Props {
	className?: string
}

const SpinBtns: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const currentSpins = useAppSelector(state => state.lottery.currentSpins)
	const isSpin = useAppSelector(state => state.lottery.isSpin)

	const handleClickSpinsQnt = useCallback(
		(spins: number) => {
			if (currentSpins !== spins) {
				dispatch({
					type: setCurrentSpins.type,
					payload: { newValue: spins },
				})
			} else {
				dispatch({
					type: setCurrentSpins.type,
					payload: { newValue: null },
				})
			}
		},
		[dispatch, currentSpins]
	)

	const handlePlayClick = useCallback(() => {
		if (currentSpins && isSpin !== 'animated') {
			dispatch({ type: setIsSpin.type, payload: { newValue: true } })
		}
	}, [dispatch, currentSpins, isSpin])

	return (
		<div className={`text-[13px] font-extrabold ${className}`}>
			<h2 className='text-center'>How many times do you want to play?</h2>
			<div className='flex justify-center gap-x-[25px] mt-[10px]'>
				<div className='flex gap-x-[10px] [&>button]:size-[22px] [&>button]:rounded-[50%] [&>button]:border-[1px] [&>button]:border-solid [&>button]:border-black [&>button]:duration-200'>
					{[1, 2, 3].map(spins => (
						<button
							key={spins}
							className={`${
								currentSpins === spins &&
								'shadow-[4px_3px_7px_0_rgba(0,0,0,70%)]'
							}`}
							onClick={() => handleClickSpinsQnt(spins)}
						>
							{spins}
						</button>
					))}
				</div>
				<button
					disabled={!currentSpins}
					onClick={handlePlayClick}
					className={`disabled:opacity-70 relative w-[120px] border-[1px] border-solid border-black rounded-[40px] bg-[#ddd9f2] shadow-[3px_3px_3px_1px_#00000080] hover:shadow-none transition-[300] ${cls.spin_btn}`}
				>
					<p className='-translate-x-[2px]'>Play</p>
					<Image
						{...magicHat[0]}
						className='absolute right-[10px] size-[35px] top-2/4 -translate-y-2/4'
						alt='Magic hat'
						width={35}
						height={35}
					/>
				</button>
			</div>
		</div>
	)
}

export { SpinBtns }
