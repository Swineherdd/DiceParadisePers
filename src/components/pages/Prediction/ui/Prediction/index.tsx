'use client'
import { FC, useEffect } from 'react'
import Animate from './Animate'
import Message from './Message'
import Preview from './Preview'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
	setGiftAnimate as setGiftAnimateType,
	setIsGiftLoaded,
} from '@/store/reducers/gifts'
import cls from './index.module.css'
import { useTranslations } from 'next-intl'

interface Props {
	prediction: string
}
const Prediction: FC<Props> = ({ prediction }) => {
	const dispatch = useAppDispatch()
	const isGifAnimate = useAppSelector(state => state.gifts.isGiftAnimate)
	const isGiftLoaded = useAppSelector(state => state.gifts.isGiftLoaded)
	const magicBallTimeoutFn = useAppSelector(
		state => state.gifts.magicBallTimeoutFn
	)
	const setIsGifAnimate = (state: boolean | null) => {
		dispatch({
			type: setGiftAnimateType.type,
			payload: {
				state,
			},
		})
	}
	const setLoadGifImg = (state: boolean) => {
		dispatch({
			type: setIsGiftLoaded.type,
			payload: {
				state,
			},
		})
	}
	const isGiftsPredictionBackgroundLoaded = useAppSelector(
		state => state.gifts.isImagePredictionLoaded
	)
	useEffect(() => {
		if (isGifAnimate === null && isGiftsPredictionBackgroundLoaded)
			magicBallTimeoutFn()
	}, [isGifAnimate, magicBallTimeoutFn, isGiftsPredictionBackgroundLoaded])

	if (isGiftLoaded && isGifAnimate) {
		setTimeout(() => {
			setIsGifAnimate(null)
		}, 3650)
	}
	const t = useTranslations('predictionPage')

	return (
		<div className={`${cls.prediction}`}>
			{isGifAnimate === false ? (
				<Preview setIsGifAnimate={setIsGifAnimate} />
			) : isGifAnimate === true ? (
				<Animate setLoadGifImg={setLoadGifImg} />
			) : (
				<Message prediction={prediction} />
			)}
			<div
				className={`${cls.container} ${cls['predictionSubtitle-container']} ${
					isGifAnimate || isGifAnimate === null ? cls.hidden : ''
				}`}
			>
				<h2 className={`${cls.mainText} ${cls.predictionSubtitle}`}>
					{t('passivePredictionDescription')}
				</h2>
			</div>
		</div>
	)
}

export default Prediction
