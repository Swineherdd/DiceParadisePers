import { FC } from 'react'
import './reset.css'
import Head from './Head'
import Prediction from './Prediction'
import Days from './Days'
import CollectBonusesBtn from './CollectBonuses'
import TodayBonus from './TodayBonus'
import AnimationStub from './AnimationStub'
import cls from './index.module.css'

interface Props {
	currentDay: number
	prediction?: string
	todayBonus: number
}
const PredictionPage: FC<Props> = ({ currentDay, prediction, todayBonus }) => {
	const ALL_DAYS: number = 7
	const userLocale = document.documentElement.lang

	return (
		<>
			<div
				className={`${cls.page} ${
					userLocale === 'en' ? 'font-poppins' : 'font-montserrat'
				}`}
			>
				<div
					className={`${cls.wrapper} ${
						!prediction || currentDay === 1 ? cls['prediction-wrapper'] : ''
					}`}
				>
					<Head currentDay={currentDay} />
					{prediction && currentDay !== 1 && (
						<Prediction prediction={prediction} />
					)}
					<div className={`${cls.container}`}>
						<Days allDays={ALL_DAYS} currentDay={currentDay} />
						<TodayBonus todayBonus={todayBonus} />
						<CollectBonusesBtn />
					</div>
				</div>
			</div>
			<AnimationStub />
		</>
	)
}

export { PredictionPage }
