'use client'
import Image from 'next/image'
import { FC, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setReferralsModalState } from '@/store/reducers/referralsPage'
import { addNft, addNftText, preloadImage } from '../../../config/images'

interface Props {
	className?: string
}
const AddNft: FC<Props> = ({ className }) => {
	const animateItemRef = useRef(null)
	const dispatch = useAppDispatch()
	const activatedBoost = useAppSelector(
		state => state.referralsPage.activatedBoost
	)

	useLayoutEffect(() => {
		if (typeof window !== undefined) {
			const tl = gsap.timeline()
			tl.fromTo(
				animateItemRef.current,
				{
					duration: 1.3,
					rotateX: -2,
				},
				{
					yoyo: true,
					repeat: -1, // Бесконечное повторение
					duration: 1.3,
					rotateX: 2,
					ease: 'power1.inOut',
				}
			).fromTo(
				'#referrals-boost-nft-gradient-animate',
				{
					duration: 1.3,
					backgroundImage:
						'linear-gradient(45deg, transparent 100%, #ffffff80, transparent 140%)',
				},
				{
					duration: 1.3,
					repeatDelay: 1.3,
					ease: 'power4.in',
					repeat: -1,
					backgroundImage:
						'linear-gradient(45deg, transparent -40%, #ffffff80, transparent 0%)',
				},
				0
			)
			return () => {
				tl.kill()
			}
		}
	}, [])

	return (
		<div
			className={`transform-style-3d perspective-[150px] ${className}`}
			onClick={() => {
				dispatch({
					type: setReferralsModalState.type,
					payload: { newState: true },
				})
			}}
		>
			<div className='' ref={animateItemRef}>
				<Image
					{...preloadImage[0]}
					src={activatedBoost?.image || preloadImage[0].src}
					className='-rotate-[22deg] drop-shadow-[2px_2px_1px_rgba(0,0,0,0.59)]'
				/>
				<div
					id='referrals-boost-nft-gradient-animate'
					className=' w-full h-full absolute left-0 top-0 z-[2] -rotate-[22deg] bg-[linear-gradient(45deg,transparent_100%,#ffffff,transparent_130%)]'
				/>
				{!activatedBoost?.image && (
					<div className='absolute left-2/4 top-[25%] gap-y-[2px] -translate-x-[55%] flex flex-col flex-wrap items-center w-full'>
						<Image {...addNft[0]} />

						<Image {...addNftText[0]} />
					</div>
				)}
			</div>
		</div>
	)
}

export { AddNft }
