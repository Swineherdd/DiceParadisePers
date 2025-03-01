'use client'
import { Typography } from '@/components/shared'
import { cn } from '@/lib'
import { IClassName } from '@/types'
import Image from 'next/image'
import { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { play, progressBg } from '../../config/image'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import {
	hideLoadingPage,
	replaceMainErrorSubtitle,
	replaceMainErrorTitle,
	showMainErrorModal,
} from '@/store/reducers/modals'

interface Props extends IClassName {}
const LoadBar: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const percentRef = useRef(0)
	const displayRef = useRef(null)
	const progressBarRef = useRef(null)
	const isAllPagesLoaded = useAppSelector(
		state => state.preloadStates.isAllPagesLoaded
	)
	const isLoadPageLoaded = useAppSelector(
		state => state.preloadStates.isLoadPageLoaded
	)

	const [isLoad, setIsLoad] = useState<boolean>(false)
	const hasError = useAppSelector(state => state.error.hasError)
	const error = useAppSelector(state => state.error.error)

	if (error) console.error(error)

	const wrapperCls = 'flex flex-col items-center flex-wrap gap-y-[inherit]'
	const progressCls = 'w-[210px] h-[45px] relative rounded-[22px]'
	const progressBarCls =
		'h-full w-0 z-[1] rounded-[inherit] bg-[linear-gradient(-45deg,rgba(248,54,0,1)_20%,rgba(250,204,35,1)_80%)]'
	const progressBarWrapperCls =
		'absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-[46%] h-[calc(100%-17px)] w-[calc(100%-17px)] rounded-[inherit]'
	const progressTextCls =
		'absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 z-[2] text-white font-bold'
	const playBtnCls = `rounded-[22px] shadow-[4px_5px_5px_0_black] hover:shadow-none duration-200 ${
		!isLoad && 'opacity-0 pointer-events-none'
	}`

	const handlePlay = async (e: MouseEvent) => {
		if (hasError) {
			dispatch({
				type: replaceMainErrorTitle.type,
				payload: { text: 'No connection' },
			})
			dispatch({
				type: replaceMainErrorSubtitle.type,
				payload: { text: 'Change your internet' },
			})
			dispatch({
				type: showMainErrorModal.type,
			})
		} else {
			router.push('/home')
			dispatch(hideLoadingPage())
		}
	}

	useEffect(() => {
		if (
			isAllPagesLoaded &&
			isLoadPageLoaded &&
			displayRef.current &&
			progressBarRef.current
		) {
			gsap.to(percentRef, {
				delay: 0.7,
				duration: 8,
				current: 100,
				onUpdate: () => {
					//@ts-ignore
					displayRef.current.innerText = `${Math.floor(percentRef.current)}%`
					//@ts-ignore
					progressBarRef.current.style.width = `${Math.floor(
						percentRef.current
					)}%`
				},
			})
			setTimeout(() => {
				setIsLoad(true)
			}, 8700)
		}
	}, [isAllPagesLoaded, isLoadPageLoaded])

	return (
		<div className={cn(wrapperCls, [className])}>
			<div className={cn(progressCls)}>
				{/* @ts-ignore */}
				<Typography ref={displayRef} size={13} className={progressTextCls}>
					{percentRef.current}%
				</Typography>
				<div className={progressBarWrapperCls}>
					<div className={progressBarCls} ref={progressBarRef} />
				</div>
				<Image {...progressBg[0]} className='w-full h-full' loading='eager' />
			</div>
			<button className={playBtnCls} onClick={handlePlay}>
				<Image {...play[0]} className='w-[170px] h-[41px]' loading='eager' />
			</button>
		</div>
	)
}

export { LoadBar }
