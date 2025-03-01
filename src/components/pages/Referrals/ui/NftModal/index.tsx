'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
	setActivateBoost,
	setReferralsModalState,
} from '@/store/reducers/referralsPage'
import Image from 'next/image'
import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { applyNft } from '@/api/referrals/apply'
import {
	replaceMainErrorSubtitle,
	replaceMainErrorTitle,
	showMainErrorModal,
} from '@/store/reducers/modals'
import Link from 'next/link'
import { arrow, preloadImage } from '../../config/images'

interface Props {
	className?: string
}
const NftModal: FC<Props> = ({ className }) => {
	const nfts = useAppSelector(state => state.referralsPage.referralsNfts)
	const dispatch = useAppDispatch()
	const state = useAppSelector(state => state.referralsPage.referralsModalState)
	const activateNft = useAppSelector(
		state => state.referralsPage.activatedBoost
	)

	return (
		<div
			className={`w-full h-[100vh] duration-100 fixed left-0 top-0 bg-[rgba(0,0,0,60%)] ${
				state ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
		>
			<div
				className={`absolute left-2/4 w-[85%] bg-white border-[1px] border-solid border-black rounded-[10px] top-[130px] -translate-x-2/4 z-[2] duration-100 ${
					state ? 'opacity-100 scale-[1]' : 'opacity-0 scale-[0.8]'
				} ${className}`}
			>
				<h2 className='text-[14px] font-bold font-montserrat text-black text-center pt-[10px]'>
					Your NFT with bonus for referrals
				</h2>
				<div className='relative mt-[10px]'>
					<div className='px-[20px]'>
						<Swiper
							className='!overflow-y-visible !overflow-x-clip'
							allowTouchMove={false}
							slidesPerGroup={3}
							slidesPerView={3}
							spaceBetween={12}
							navigation={{
								enabled: nfts.length > 3,
								nextEl: '#referrals-nfts-next-btn',
								prevEl: '#referrals-nfts-prev-btn',
							}}
							modules={[Navigation]}
							speed={800}
						>
							{nfts.map((el, index) => {
								if (el !== null)
									return (
										<SwiperSlide
											key={el.id}
											onClick={() => {
												if (el.name !== activateNft?.name)
													applyNft(el.name)
														.then(res => {
															dispatch({
																type: setActivateBoost.type,
																payload: {
																	data: {
																		image: el.image,
																		name: el.name,
																		percent: res.data.bonus_percent,
																	},
																},
															})
															dispatch({
																type: setReferralsModalState.type,
																payload: {
																	newState: false,
																},
															})
														})
														.catch(e => {
															console.error(e)

															dispatch({
																type: replaceMainErrorTitle.type,
																payload: {
																	text: 'Error',
																},
															})
															dispatch({
																type: replaceMainErrorSubtitle.type,
																payload: {
																	text: 'Unexpected error on server',
																},
															})
															dispatch({
																type: showMainErrorModal.type,
															})
														})
											}}
											className={`bg-black rounded-[4px]`}
										>
											<Image
												loading='eager'
												alt='nft'
												width={110}
												height={156}
												src={el.image}
												className={`w-full h-auto aspect-[110/156] drop-shadow-[2px_2px_1px_rgba(0,0,0,0.59)] ${
													el.name === activateNft?.name && 'opacity-60'
												}`}
											/>
										</SwiperSlide>
									)

								return (
									<SwiperSlide key={`key-${index}`}>
										<button
											onClick={() => {
												window.open('https://getgems.io/diceparadise', '_blank')
											}}
										>
											<Image
												loading='eager'
												{...preloadImage[0]}
												className='w-full h-auto aspect-[110/156] drop-shadow-[2px_2px_1px_rgba(0,0,0,0.59)]'
											/>
											<div className='absolute left-0 top-0 bg-[rgba(255,255,255,0.8)] rounded-[3px] w-full h-full flex justify-center items-center'>
												<div className='w-[30px] h-[30px] bg-black flex justify-center items-center text-white text-[25px]'>
													+
												</div>
											</div>
										</button>
									</SwiperSlide>
								)
							})}
						</Swiper>
					</div>
					<div className='absolute left-0 bottom-0 translate-y-[25%] bg-[#0d5780] w-full h-[50px] -z-[1]' />

					<div className='absolute left-2/4 -translate-x-2/4 top-2/4 w-[calc(100%+40px)] -translate-y-[50%]  flex justify-between'>
						<button
							id='referrals-nfts-prev-btn'
							className='w-[30px] h-[30px] bg-white rounded-[50%] -scale-x-[1]'
						>
							<Image {...arrow[0]} className='size-full' />
						</button>
						<button
							id='referrals-nfts-next-btn'
							className='w-[30px] h-[30px] bg-white rounded-[50%]'
						>
							<Image {...arrow[0]} className='size-full' />
						</button>
					</div>
				</div>
				<button
					className='shadow-[3px_3px_5px_1px_#00000080] hover:shadow-none transition-[300] mt-[20px] mx-auto w-[70%] mb-[15px] h-[35px] rounded-[12px] flex justify-center items-center text-black font-montserrat font-bold text-[12px] border-[1px] border-solid border-black'
					onClick={() => {
						dispatch({
							type: setReferralsModalState.type,
							payload: {
								newState: false,
							},
						})
					}}
				>
					CLOSE
				</button>
			</div>
		</div>
	)
}

export { NftModal }
