'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setIsSpin } from '@/store/reducers/lottery'
import {
	replaceMainSuccessImage,
	replaceMainSuccessSubtitle,
	replaceMainSuccessTitle,
	showMainSuccessModal,
} from '@/store/reducers/modals'
import React, { FC, useEffect, useState, useRef, useCallback } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { getPrizes } from '@/api/roulette/getPrizes'
import { spinRoulette, IRouletteSpinResponse } from '@/api/roulette/getSpins'
import Image from 'next/image'
import { getChatId } from '@/api/user/chatId'
import { mockSpinRoulette } from '@/api/roulette/getMockSpins'

interface Props {
	className?: string
}

const Roulette: FC<Props> = ({ className }) => {
	const dispatch = useAppDispatch()
	const currentSpins = useAppSelector(state => state.lottery.currentSpins)
	const isSpin = useAppSelector(state => state.lottery.isSpin)

	const [prizes, setPrizes] = useState<
		{ id: number; name: string; image: string }[]
	>([])
	const [wonPrizes, setWonPrizes] = useState<{ name: string }[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [retrySpin, setRetrySpin] = useState<number | null>(null)
	const [targetIndex, setTargetIndex] = useState<number>(-2)
	const [spinCount, setSpinCount] = useState<number>(0)

	const swiperRef = useRef<any>(null)

	const DURATION_SLIDE_SWIPE = 140
	const DELAY_SPINS_BETWEEN_MS = 1000
	const ROULETTE_ANIMATION_LOOPS = 0.5

	
	useEffect(() => {
		const fetchPrizes = async () => {
			setLoading(true)
			try {
				const newPrizes = await getPrizes()
				setPrizes(newPrizes.slice(0, 0))
			} catch (error) {
				console.error('Error fetching prizes', error)
			} finally {
				setLoading(false)
			}
		}

		fetchPrizes()
	}, [])

	
	const handleSpin = async (spins_qnt: number) => {
		try {
			
			const response = await spinRoulette({ spins_qnt }) 

			if (response.prizes && response.prizes.length > 0) {
				setWonPrizes(response.prizes.slice(0, spins_qnt))
				setSpinCount(spins_qnt)
				setRetrySpin(0)
			} else if (response.error) {
				throw new Error(response.error.message)
			}
		} catch (error) {
			console.error('Error spinning roulette:', error)
			let errorMessage = 'Не удалось выполнить прокрутку.'
			if (error instanceof Error) {
				errorMessage = error.message
			}
			dispatch(replaceMainSuccessTitle({ text: 'Ошибка' }))
			dispatch(
				replaceMainSuccessSubtitle({
					text: errorMessage,
				})
			)
			dispatch(showMainSuccessModal())
		}
	}

	
	useEffect(() => {
		if (isSpin === true && currentSpins !== null) {
			handleSpin(currentSpins)
			dispatch({ type: setIsSpin.type, payload: { newValue: 'animated' } })
		}
	}, [isSpin, currentSpins, dispatch])

	
	const handleSliderMove = useCallback(
		(e: any) => {
			if (
				e.realIndex + 1 === targetIndex &&
				retrySpin !== null &&
				retrySpin + 1 <= spinCount
			) {
				swiperRef.current.autoplay.stop()

				if (retrySpin + 1 < spinCount) {
					setTimeout(() => {
						setRetrySpin(retrySpin + 1)
					}, DELAY_SPINS_BETWEEN_MS)
				} else {
					setTimeout(() => {
						setRetrySpin(null)
						dispatch({ type: setIsSpin.type, payload: { newValue: false } })

					
						dispatch(replaceMainSuccessTitle({ text: 'Congratulations!' }))
						dispatch(replaceMainSuccessSubtitle({ text: 'You won:' }))
						dispatch(
							replaceMainSuccessImage({
								image: (
									<div className='flex w-full h-[100px] gap-x-[10px]'>
										{wonPrizes.map((prize, index) => {
										
											const prizeImage = prizes[index % prizes.length]?.image
											  return (
													<div
														key={index}
														className={`flex flex-col items-center ${
															wonPrizes.length === 1
																? 'w-full'
																: wonPrizes.length === 2
																? 'w-1/2'
																: 'w-1/3'
														}`}
													>
														{prizeImage && (
															<Image
																src={prizeImage}
																alt={prize.name}
																width={60}
																height={60}
																className='object-contain'
															/>
														)}
														<p className='mt-1 text-[12px] text-center font-bold text-black'>
															{prize.name}
														</p>
													</div>
												)
										})}
									</div>
								),
							})
						)
						dispatch(showMainSuccessModal())
					}, DURATION_SLIDE_SWIPE)
				}
				setTargetIndex(-2)
			}
		},
		[retrySpin, targetIndex, dispatch, spinCount, wonPrizes, prizes]
	)

	
	useEffect(() => {
		if (isSpin === 'animated' && retrySpin !== null) {
			swiperRef.current.autoplay.start()

			setTimeout(() => {
				if (retrySpin !== null && prizes[retrySpin]) {
					setTargetIndex(prizes[retrySpin].id)
				}
			}, DURATION_SLIDE_SWIPE * ROULETTE_ANIMATION_LOOPS * swiperRef.current.slides.length)
		}
	}, [isSpin, retrySpin, prizes])


	const getPrizeImage = (index: number): JSX.Element => {
		const prize = prizes[index]
		if (prize) {
			return (
				<div className='flex items-center justify-center size-full '>
					<Image
						src={prize.image}
						alt={prize.name}
						width={100}
						height={100}
						placeholder='blur'
						blurDataURL={prize.image}
					/>
				</div>
			)
		}
		return (
			<div className='bg-gray-700 text-white w-full h-full flex items-center justify-center'>
				Загрузка...
			</div>
		)
	}

	const slides = prizes.map((_, index) => (
		<SwiperSlide style={{ width: 85 }} key={index}>
			{getPrizeImage(index)}
		</SwiperSlide>
	))

	return (
		<div className={`w-full min-h-[90px] mt-4 relative ${className}`}>
		
			<div
				className='absolute w-[100%] bg-[#0b0c1d] h-[90px] left-2/4 top-0 -translate-x-2/4 rounded-lg'
				style={{
					border: '2px solid #8b5cf6', 
					boxShadow: '0 0 15px rgba(139, 92, 246, 0.8)', 
				}}
			>
				<Swiper
					wrapperClass=''
					onSliderMove={() => {}}
					onSlidesUpdated={handleSliderMove}
					allowSlidePrev={false}
					allowSlideNext={true}
					oneWayMovement={true}
					allowTouchMove={false}
					centeredSlides
					spaceBetween={10}
					loopAdditionalSlides={1}
					speed={DURATION_SLIDE_SWIPE}
					onSwiper={swiper => {
						swiperRef.current = swiper
					}}
					modules={[Autoplay]}
					//@ts-ignore
					autoplay={{ delay: 0, enabled: false }}
					slidesPerView={'auto'}
					loop={true}
					className='h-full text-white !py-[10px] [&>div]:!ease-linear'
				>
					{slides}
				</Swiper>
			</div>

			
			<div
				className='absolute w-[2px] h-[90px] bg-purple-500 left-2/4 top-0 -translate-x-2/4 z-1'
				style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}
			/>
		</div>
	)
}

export { Roulette }
