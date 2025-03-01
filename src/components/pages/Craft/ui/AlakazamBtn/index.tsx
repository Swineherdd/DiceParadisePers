'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { alakazam } from '@/api/craft/alakazam'
import {
	addCraftCardData,
	addSliderDataItem,
	removeSliderDataItem,
	resetCraftCards,
} from '@/store/reducers/craft'
import {
	replaceMainErrorSubtitle,
	replaceMainErrorTitle,
	replaceMainSuccessImage,
	replaceMainSuccessSubtitle,
	replaceMainSuccessTitle,
	showMainErrorModal,
	showMainSuccessModal,
} from '@/store/reducers/modals'
import Image from 'next/image'
import { FC, MouseEventHandler } from 'react'
import gsap from 'gsap'
import { alakazamIcon } from '../../config/image'

interface Props {}
const AlakazamBtn: FC<Props> = ({}) => {
	const craftItemsData = useAppSelector(state => state.craft.craftCardsDataArr)

	const dispatch = useAppDispatch()
	const handleClick: MouseEventHandler = () => {
		if (craftItemsData.length >= 3) {
			if (craftItemsData.length <= 5) {
				const tl = gsap.timeline({
					onComplete: () => {
						const postData = async () => {
							try {
								const res = (
									await alakazam({
										nfts: craftItemsData,
									})
								).data

								if (res.error) {
									let errorTitle
									let errorSubtitle

									switch (res.error.type) {
										case 'nftNotAvailable':
											errorTitle = 'Craft error'
											errorSubtitle = 'NFT not on balance'
											break
										case 'noRecipe':
											errorTitle = 'Craft error'
											errorSubtitle = 'Recipe not found'
											break

										default:
											errorTitle = 'Error'
											errorSubtitle = 'Unexpected error on server'
											break
									}

									dispatch({
										type: replaceMainErrorTitle.type,
										payload: {
											text: errorTitle,
										},
									})
									dispatch({
										type: replaceMainErrorSubtitle.type,
										payload: {
											text: errorSubtitle,
										},
									})
									dispatch({
										type: showMainErrorModal.type,
									})

									dispatch({
										type: resetCraftCards.type,
									})
								}

								if (res.image && res.name) {
									dispatch({
										type: replaceMainSuccessTitle.type,
										payload: {
											text: 'Success',
										},
									})
									dispatch({
										type: replaceMainSuccessImage.type,
										payload: {
											image: (
												<Image
													src={res.image}
													alt='card'
													width={100}
													height={130}
													className='h-auto'
												/>
											),
										},
									})
									dispatch({
										type: replaceMainSuccessSubtitle.type,
										payload: {
											text: `Card was crafted`,
										},
									})
									dispatch({ type: showMainSuccessModal.type })
									dispatch({
										type: resetCraftCards.type,
									})
									dispatch({
										type: removeSliderDataItem.type,
										payload: {
											ids: craftItemsData.map(({ id }) => id),
										},
									})
									dispatch({
										type: addSliderDataItem.type,
										payload: {
											item: res,
										},
									})
									dispatch({
										type: addCraftCardData.type,
										payload: {
											data: res,
										},
									})
								}
							} catch (err) {
								console.error(err)
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

								dispatch({
									type: resetCraftCards.type,
								})
							}
						}
						postData()
					},
				})
				tl.to('.craft-page-area-item', {
					marginLeft: '-100%',
					ease: 'power4.out',
				}).to(
					'.craft-page-area',
					{
						width: 70,
						ease: 'power4.out',
					},
					0
				)
			} else {
				dispatch({
					type: replaceMainErrorTitle.type,
					payload: {
						text: 'Overflow',
					},
				})
				dispatch({
					type: replaceMainErrorSubtitle.type,
					payload: {
						text: 'Maximum 5 cards',
					},
				})
				dispatch({ type: showMainErrorModal.type })
			}
		} else {
			dispatch({
				type: replaceMainErrorTitle.type,
				payload: {
					text: 'Not enough cards',
				},
			})
			dispatch({
				type: replaceMainErrorSubtitle.type,
				payload: {
					text: 'Minimum 3 cards',
				},
			})
			dispatch({ type: showMainErrorModal.type })
		}
	}

	return (
		<button
			className='z-[2] -translate-y-[120%] w-[40%] bg-white text-black font-extrabold border-[1px] border-solid border-black rounded-[20px] py-[3px] px-[7px] text-[13px] flex gap-x-[5px] justify-center items-center absolute left-2/4 -translate-x-2/4 max-w-[150px] shadow-[1px_2px_4px_1px_#000000] hover:shadow-none transition-[200]'
			onClick={handleClick}
		>
			<p className=''>Alakazam</p>
			<Image {...alakazamIcon[0]} />
		</button>
	)
}

export { AlakazamBtn }
