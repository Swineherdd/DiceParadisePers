import { FC } from 'react'
import cls from './index.module.css'

interface Props {
	allDays: number
	currentDay: number
}
const Days: FC<Props> = ({ allDays, currentDay }) => {
	return (
		<ul className={`${cls.daysGroup}`}>
			{[...Array(allDays)].map((_, index) => {
				return (
					<li
						className={`${cls.daysItem} ${
							index + 1 <= currentDay ? cls.active : ''
						}`}
						key={index}
					>
						<p className={`${cls.mainText} `}>{index + 1}</p>
					</li>
				)
			})}
		</ul>
	)
}

export default Days
