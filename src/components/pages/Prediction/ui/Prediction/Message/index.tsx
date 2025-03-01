'use client'
import { FC } from 'react'
import cls from './index.module.css'
import Image from 'next/image'
import { useAppDispatch } from '@/hooks/redux'
import { setIsImagePredictionLoaded } from '@/store/reducers/gifts'
import { useTranslations } from 'next-intl'

interface Props {
	prediction: string
}
const Message: FC<Props> = ({ prediction }) => {
	const dispatch = useAppDispatch()
	const t = useTranslations('predictionPage')

	return (
		<div className={`${cls.predictionContent}`}>
			<div className={`${cls.background}`}>
				<Image
					alt='Background'
					src={'/images/prediction-background.png'}
					width={360}
					height={200}
					onLoad={() => {
						dispatch({
							type: setIsImagePredictionLoaded.type,
							payload: {
								state: true,
							},
						})
					}}
				/>
			</div>
			<div className={`${cls.predictionWrapper}`}>
				<div className={`${cls.container}`}>
					<h2 className={`${cls.mainText}`}>
						{t('activePredictionDescription')}
						<br />"{prediction}"
					</h2>
				</div>
			</div>
		</div>
	)
}

export default Message
