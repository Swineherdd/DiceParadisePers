import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
	addCraftCardData,
	removeCraftCardData,
	setSelectedCardData,
} from '@/store/reducers/craft'
import {
	replaceMainErrorTitle,
	replaceMainErrorSubtitle,
	showMainErrorModal,
} from '@/store/reducers/modals'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { craft } from '../../config/image'
import { question } from '@/config/sharedImage'

interface Props {
	className?: string
}
const CraftArea: FC<Props> = ({ className }) => {
	const selectedCardData = useAppSelector(state => state.craft.selectedCardData)
	const dispatch = useAppDispatch()
	const craftCardsDataArr = useAppSelector(
		state => state.craft.craftCardsDataArr
	)

	return (
		<div
			className={`absolute min-w-[70px] h-[100px] backdrop-hue-rotate-180 left-2/4 -translate-x-[52%] top-[25.9%] rounded-[8px] ${className}`}
			onClick={() => {
				if (selectedCardData) {
					if (craftCardsDataArr.length >= 5) {
						dispatch({
							type: setSelectedCardData.type,
							payload: {
								data: undefined,
							},
						})
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
					} else {
						dispatch({
							type: addCraftCardData.type,
							payload: {
								data: selectedCardData,
							},
						})
						dispatch({
							type: setSelectedCardData.type,
							payload: {
								data: undefined,
							},
						})
					}
				}
			}}
		>
			<div
				className='craft-page-area absolute left-2/4 -translate-x-2/4 top-0 min-w-[inherit] h-[inherit] rounded-[inherit]'
				style={{
					width: `${
						craftCardsDataArr.length <= 1
							? 70
							: (70 / 100) * 50 * (craftCardsDataArr.length - 1) + 70
					}px`,
				}}
			></div>
			<Image
				{...craft[0]}
				className='absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4'
			/>
			<div className='absolute left-0 top-0 w-full h-full z-[2] flex justify-center'>
				{craftCardsDataArr.length
					? craftCardsDataArr.map(({ id, image }, index) => {
							return (
								<Image
									priority
									key={id}
									src={image}
									alt='card'
									width={100}
									height={130}
									className={`craft-page-area-item object-cover min-w-[70px] h-full ${
										index !== 0 ? '-ml-[50%]' : '!ml-0'
									}`}
									onClick={() => {
										if (!selectedCardData)
											dispatch({
												type: removeCraftCardData.type,
												payload: {
													id: id,
												},
											})
									}}
								/>
							)
					  })
					: ''}
			</div>
			<Link
				rel='noopener noreferrer'
				target='_blank'
				href={'https://hi.dice-paradise.com/nft-proekta/kraft-nft'}
				className='absolute right-0 top-0 translate-x-full -translate-y-[105%]'
			>
				<Image {...question[0]} className='' />
			</Link>
		</div>
	)
}

export { CraftArea }
